import {useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Formik, FormikHelpers} from 'formik';
import orderBy from 'lodash/orderBy';

import Avatar from 'components/Avatar';
import {ButtonType} from 'components/Button';
import {getSelf} from 'selectors/state';
import {CommentReadSerializer, SFC} from 'types';
import {authorizationHeaders} from 'utils/authentication';
import {displayErrorToast} from 'utils/toast';
import yup from 'utils/yup';
import Comment from './Comment';
import * as S from './Styles';

const Comments: SFC = ({className}) => {
  const [comments, setComments] = useState<CommentReadSerializer[]>([]);
  const [newComments, setNewComments] = useState<CommentReadSerializer[]>([]);
  const [requestPending, setRequestPending] = useState<boolean>(true);
  const {id: recipeId} = useParams();
  const self = useSelector(getSelf);

  const initialValues = {
    text: '',
  };

  type FormValues = typeof initialValues;

  useEffect(() => {
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
    return orderBy([...comments, ...newComments], ['created_date'], ['desc']);
  }, [comments, newComments]);

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

  const renderCommentCount = () => {
    const commentsText = commentList.length === 1 ? 'comment' : 'comments';
    return (
      <div>
        {commentList.length} {commentsText}
      </div>
    );
  };

  const renderComments = () => {
    return commentList.map((comment) => <Comment comment={comment} key={comment.id} />);
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      text: yup.string().required(),
    });
  }, []);

  if (requestPending) return null;

  return (
    <S.Container className={className}>
      {renderCommentCount()}
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
