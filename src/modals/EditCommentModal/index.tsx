import {useMemo} from 'react';
import axios from 'axios';
import {Form, Formik} from 'formik';

import Button, {ButtonType} from 'components/Button';
import {CommentReadSerializer, SFC} from 'types';
import {authorizationHeaders} from 'utils/authentication';
import {displayErrorToast} from 'utils/toast';
import yup from 'utils/yup';
import * as S from './Styles';

export interface EditCommentModalProps {
  close(): void;
  comment: CommentReadSerializer;
  handleEdit: (comment: CommentReadSerializer) => void;
}

const EditCommentModal: SFC<EditCommentModalProps> = ({className, close, comment, handleEdit}) => {
  const initialValues = {
    text: comment.text,
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const {data} = await axios.patch<CommentReadSerializer>(
        `${process.env.REACT_APP_API_URL}/api/comments/${comment.id}`,
        values,
        authorizationHeaders(),
      );
      handleEdit(data);
      close();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error editing comment');
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      text: yup.string().required(),
    });
  }, []);

  return (
    <S.Modal className={className} close={close} header="Edit comment">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({dirty, errors, isSubmitting, touched, isValid}) => (
          <Form>
            <S.Input errors={errors} label="Text" name="text" touched={touched} />
            <Button
              dirty={dirty}
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
              isValid={isValid}
              text="Submit"
              type={ButtonType.submit}
            />
          </Form>
        )}
      </Formik>
    </S.Modal>
  );
};

export default EditCommentModal;
