import {useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Formik, FormikHelpers} from 'formik';
import orderBy from 'lodash/orderBy';

import {createComment, getCommentsByRecipeId} from 'api/comments';
import Avatar from 'components/Avatar';
import {ButtonType} from 'components/Button';
import {CORE_TRANSACTION_FEE} from 'constants/protocol';
import {getSelf} from 'selectors/state';
import {CommentReadSerializer, RecipeReadSerializer, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import yup from 'utils/yup';
import Comment from './Comment';
import Overview from './Overview';
import * as S from './Styles';

export interface CommentsProps {
  recipe: RecipeReadSerializer;
  refreshRecipe: () => void;
}

const Comments: SFC<CommentsProps> = ({className, recipe, refreshRecipe}) => {
  const [comments, setComments] = useState<CommentReadSerializer[]>([]);
  const [deletedCommentIds, setDeletedCommentIds] = useState<number[]>([]);
  const [editedComments, setEditedComments] = useState<CommentReadSerializer[]>([]);
  const [newComments, setNewComments] = useState<CommentReadSerializer[]>([]);
  const [requestPending, setRequestPending] = useState<boolean>(true);
  const {id: recipeId} = useParams();
  const self = useSelector(getSelf);

  const initialValues = {
    amount: '',
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
        const data = await getCommentsByRecipeId(Number(recipeId));
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
      const data = await createComment(requestData);
      setNewComments([...newComments, data]);
      refreshRecipe();
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

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      amount: yup
        .number()
        .required()
        .min(1)
        .test('amount-does-not-exceed-balance-plus-fees', 'Invalid amount', (amount) => {
          return self.balance >= amount + CORE_TRANSACTION_FEE;
        }),
      text: yup.string().required(),
    });
  }, [self.balance]);

  if (requestPending) return null;

  return (
    <S.Container className={className}>
      <Overview commentList={commentList} recipe={recipe} refreshRecipe={refreshRecipe} />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({dirty, errors, isSubmitting, touched, isValid}) => (
          <S.Form>
            <Avatar accountNumber={self.accountNumber} displayImage={self.displayImage} />
            <S.TextInput errors={errors} name="text" placeholder="Add a comment..." touched={touched} />
            <S.AmountInput errors={errors} name="amount" placeholder="Amount" touched={touched} />
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
