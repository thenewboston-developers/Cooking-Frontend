import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Field, Form, Formik} from 'formik';
import MdiIcon from '@mdi/react';
import {mdiClose} from '@mdi/js';

import {createRecipe, updateRecipe} from 'api/recipes';
import Button, {ButtonType} from 'components/Button';
import {FileInput} from 'components/FormElements';
import {ToastType} from 'enums';
import {useActiveRecipe, useIsAuthenticated} from 'hooks';
import {SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toast';
import yup from 'utils/yup';
import * as S from './Styles';

const CreateEditRecipe: SFC = ({className}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const activeRecipe = useActiveRecipe();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  const initialValues = useMemo(
    () => ({
      description: activeRecipe?.description || '',
      image: activeRecipe?.image || '',
      name: activeRecipe?.name || '',
    }),
    [activeRecipe?.description, activeRecipe?.image, activeRecipe?.name],
  );

  type FormValues = typeof initialValues;

  useEffect(() => {
    if (!initialValues.image) return;
    setPreview(initialValues.image);
  }, [initialValues]);

  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      // Create a data URL for the file
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      let responseData;
      const requestData = new FormData();
      requestData.append('name', values.name);
      requestData.append('description', values.description);

      if (initialValues.image !== values.image) requestData.append('image', values.image);

      if (activeRecipe) {
        responseData = await updateRecipe(activeRecipe.id, requestData);
        displayToast('Recipe updated!', ToastType.success);
      } else {
        responseData = await createRecipe(requestData);
        displayToast('Recipe created!', ToastType.success);
      }

      navigate(`/recipe/${responseData.id}`);
    } catch (error) {
      console.error(error);
      const verb = activeRecipe ? 'updating' : 'creating';
      displayErrorToast(`Error ${verb} recipe`);
    }
  };

  const renderPreview = (setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) => {
    let imgSrc;
    if (preview) imgSrc = preview;
    if (!imgSrc) return null;

    return (
      <S.ImgContainer
        onClick={() => {
          setFieldValue('image', '');
          setPreview(null);
        }}
      >
        <S.CloseButtonContainer>
          <MdiIcon path={mdiClose} size="16px" />
        </S.CloseButtonContainer>
        <S.Img alt="Preview" src={imgSrc} />
      </S.ImgContainer>
    );
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      description: yup.string().required(),
      image: yup.mixed().required(),
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
          {({dirty, errors, isSubmitting, touched, isValid, setFieldValue, values}) => (
            <Form>
              <S.Input errors={errors} label="Name" name="name" touched={touched} />
              <S.Input errors={errors} label="Description" name="description" touched={touched} />
              {!values.image && (
                <Field component={FileInput} name="image" onChange={handleFileChange} touched={touched} />
              )}
              {renderPreview(setFieldValue)}
              <S.Bumper />
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
