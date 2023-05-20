import {ChangeEvent, FC, useEffect, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {Field, FieldProps, Form, Formik, useField} from 'formik';

import {createRecipe, updateRecipe} from 'api/recipes';
import Button, {ButtonType} from 'components/Button';
import {ToastType} from 'enums';
import {useActiveRecipe, useIsAuthenticated} from 'hooks';
import {SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toast';
import yup from 'utils/yup';
import * as S from './Styles';

const CustomFileInput: FC<FieldProps<File | null>> = ({field, form, ...props}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, __, helpers] = useField<File | null>(field.name);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files && event.currentTarget.files[0];
    form.setFieldValue(field.name, file);
    helpers.setValue(file);
  };

  return (
    <>
      <input {...field} {...props} accept="image/*" onChange={handleChange} type="file" value={undefined} />
      {form.touched[field.name] && form.errors[field.name] && <div>{String(form.errors[field.name])}</div>}
    </>
  );
};

const CreateEditRecipe: SFC = ({className}) => {
  const activeRecipe = useActiveRecipe();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  const initialValues = {
    description: activeRecipe?.description || '',
    image: activeRecipe?.image || '',
    name: activeRecipe?.name || '',
  };

  type FormValues = typeof initialValues;

  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      let responseData;
      const requestData = new FormData();
      requestData.append('name', values.name);
      requestData.append('description', values.description);
      requestData.append('image', values.image);

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

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      description: yup.string().required(),
      image: yup.mixed(),
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
              <Field component={CustomFileInput} name="image" touched={touched} />
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
