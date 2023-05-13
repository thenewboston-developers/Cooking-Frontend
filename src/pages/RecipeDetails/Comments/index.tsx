import {useMemo} from 'react';
import {Formik, FormikHelpers} from 'formik';

import DefaultAvatar from 'assets/default-avatar.png';
import {ButtonType} from 'components/Button';
import {SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import yup from 'utils/yup';
import * as S from './Styles';

const Comments: SFC = ({className}) => {
  const initialValues = {
    text: '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues, {resetForm}: FormikHelpers<FormValues>): Promise<void> => {
    try {
      console.log(values);
      resetForm();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error submitting the comment');
    }
  };

  const renderComments = () => {
    return (
      <>
        <S.Comment>
          <div>
            <S.ImgWrapper>
              <S.Img alt="avatar" src={DefaultAvatar} />
            </S.ImgWrapper>
          </div>
          <S.CommentText>Hey now</S.CommentText>
        </S.Comment>
        <S.Comment>
          <div>
            <S.ImgWrapper>
              <S.Img alt="avatar" src={DefaultAvatar} />
            </S.ImgWrapper>
          </div>
          <S.CommentText>Hey now</S.CommentText>
        </S.Comment>
      </>
    );
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      text: yup.string().required(),
    });
  }, []);

  return (
    <S.Container className={className}>
      <div>0 comments</div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({dirty, errors, isSubmitting, touched, isValid}) => (
          <S.Form>
            <div>
              <S.ImgWrapper>
                <S.Img alt="avatar" src={DefaultAvatar} />
              </S.ImgWrapper>
            </div>
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
