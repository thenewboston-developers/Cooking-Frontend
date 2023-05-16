import {useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Formik, FormikHelpers} from 'formik';
import orderBy from 'lodash/orderBy';

import Avatar from 'components/Avatar';
import {ButtonType} from 'components/Button';
import CoinAmount from 'components/CoinAmount';
import {getSelf} from 'selectors/state';
import {CommentReadSerializer, SFC} from 'types';
import {authorizationHeaders} from 'utils/authentication';
import {displayErrorToast} from 'utils/toast';
import yup from 'utils/yup';
import Comment from './Comment';
import * as S from './Styles';

export interface CommentsProps {
  recipeBalance: number;
}

const Comments: SFC<CommentsProps> = ({className, recipeBalance}) => {
  const [comments, setComments] = useState<CommentReadSerializer[]>([]);
  const [deletedCommentIds, setDeletedCommentIds] = useState<number[]>([]);
  const [editedComments, setEditedComments] = useState<CommentReadSerializer[]>([]);
  const [newComments, setNewComments] = useState<CommentReadSerializer[]>([]);
  const [requestPending, setRequestPending] = useState<boolean>(true);
  const {id: recipeId} = useParams();
  const self = useSelector(getSelf);

  const initialValues = {
    text: '',
  };

  type FormValues = typeof initialValues;

  useEffect(() => {
    setDeletedCommentIds([]);
    setEditedComments([]);
    setNewComments([]);
  }, [recipeId]);

  useEffect(() => {
    (async () => {
      try {
        setRequestPending(true);
        const {data} = await axios.get<CommentReadSerializer[]>(
          `${process.env.REACT_APP_API_URL}/api/comments?recipe=${recipeId}`,
        );
        setComments(data);
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching comments');
      } finally {
        setRequestPending(false);
      }
    })();
  }, [recipeId]);

  const commentList = useMemo(() => {
    const editedCommentsIds = editedComments.map(({id}) => id);
    let items = [...comments, ...newComments].filter(({id}) => !editedCommentsIds.includes(id));
    items = [...items, ...editedComments].filter(({id}) => !deletedCommentIds.includes(id));
    return orderBy(items, ['created_date'], ['desc']);
  }, [comments, deletedCommentIds, editedComments, newComments]);

  const handleCommentDelete = (id: number) => {
    setDeletedCommentIds([...deletedCommentIds, id]);
  };

  const handleCommentEdit = (comment: CommentReadSerializer) => {
    const items = editedComments.filter(({id}) => id !== comment.id);
    setEditedComments([...items, comment]);
  };

  const handleSubmit = async (values: FormValues, {resetForm}: FormikHelpers<FormValues>): Promise<void> => {
    try {
      const requestData = {...values, recipe: recipeId};

      const {data} = await axios.post<CommentReadSerializer>(
        `${process.env.REACT_APP_API_URL}/api/comments`,
        requestData,
        authorizationHeaders(),
      );

      setNewComments([...newComments, data]);
      resetForm();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error submitting the comment');
    }
  };

  const renderComments = () => {
    return commentList.map((comment) => (
      <Comment comment={comment} handleDelete={handleCommentDelete} handleEdit={handleCommentEdit} key={comment.id} />
    ));
  };

  const renderOverview = () => {
    const commentsText = commentList.length === 1 ? 'comment' : 'comments';
    return (
      <S.Overview>
        <S.CommentListLength>
          {commentList.length} {commentsText}
        </S.CommentListLength>
        <CoinAmount amount={recipeBalance} />
      </S.Overview>
    );
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      text: yup.string().required(),
    });
  }, []);

  if (requestPending) return null;

  return (
    <S.Container className={className}>
      {renderOverview()}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({dirty, errors, isSubmitting, touched, isValid}) => (
          <S.Form>
            <Avatar accountNumber={self.accountNumber} displayImage={self.displayImage} />
            <S.InlineInput errors={errors} name="text" touched={touched} />
            <S.Button
              dirty={dirty}
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
              isValid={isValid}
              text="Submit"
              type={ButtonType.submit}
            />
          </S.Form>
        )}
      </Formik>
      {renderComments()}
    </S.Container>
  );
};

export default Comments;
