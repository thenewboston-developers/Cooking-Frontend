import {useEffect, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Form, Formik} from 'formik';

import Button, {ButtonType} from 'components/Button';
import {ToastType} from 'enums';
import {useActiveRecipe, useIsAuthenticated} from 'hooks';
import {RecipeReadSerializer, SFC} from 'types';
import {authorizationHeaders} from 'utils/authentication';
import {displayErrorToast, displayToast} from 'utils/toast';
import yup from 'utils/yup';
import * as S from './Styles';

const CreateEditRecipe: SFC = ({className}) => {
  const activeRecipe = useActiveRecipe();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  const initialValues = {
    description: activeRecipe?.description || '',
    imageUrl: activeRecipe?.imageUrl || '',
    name: activeRecipe?.name || '',
  };

  type FormValues = typeof initialValues;

  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      let response;
      const requestData = {
        description: values.description,
        image_url: values.imageUrl,
        name: values.name,
      };

      if (activeRecipe) {
        response = await axios.patch<RecipeReadSerializer>(
          `${process.env.REACT_APP_API_URL}/api/recipes/${activeRecipe.id}`,
          requestData,
          authorizationHeaders(),
        );
        displayToast('Recipe updated!', ToastType.success);
      } else {
        response = await axios.post<RecipeReadSerializer>(
          `${process.env.REACT_APP_API_URL}/api/recipes`,
          requestData,
          authorizationHeaders(),
        );
        displayToast('Recipe created!', ToastType.success);
      }

      navigate(`/recipe/${response.data.id}`);
    } catch (error) {
      console.error(error);
      const verb = activeRecipe ? 'updating' : 'creating';
      displayErrorToast(`Error ${verb} recipe`);
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
