import {useEffect, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Form, Formik} from 'formik';

import Button, {ButtonType} from 'components/Button';
import {ToastType} from 'enums';
import {useIsAuthenticated} from 'hooks';
import {getSelf} from 'selectors/state';
import {SFC} from 'types';
import {authorizationHeaders} from 'utils/authentication';
import {displayErrorToast, displayToast} from 'utils/toast';
import yup from 'utils/yup';
import * as S from './Styles';

const CreateEditRecipe: SFC = ({className}) => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const self = useSelector(getSelf);

  const initialValues = {
    description: '',
    imageUrl: '',
    name: '',
  };

  type FormValues = typeof initialValues;

  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const requestData = {...values, image_url: values.imageUrl};
      await axios.post(`${process.env.REACT_APP_API_URL}/api/recipes`, requestData, authorizationHeaders());
      displayToast('Recipe created!', ToastType.success);
      navigate(`/profile/${self.accountNumber}`);
    } catch (error) {
      console.error(error);
      displayErrorToast('Error creating recipe');
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      description: yup.string().required(),
      imageUrl: yup.string().url().required(),
      name: yup.string().required(),
    });
  }, []);

  return (
    <S.Container className={className}>
      <S.Card>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnMount={false}
          validationSchema={validationSchema}
        >
          {({dirty, errors, isSubmitting, touched, isValid}) => (
            <Form>
              <S.Input errors={errors} label="Image URL" name="imageUrl" touched={touched} />
              <S.Input errors={errors} label="Name" name="name" touched={touched} />
              <S.Input errors={errors} label="Description" name="description" touched={touched} />
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
      </S.Card>
    </S.Container>
  );
};

export default CreateEditRecipe;
