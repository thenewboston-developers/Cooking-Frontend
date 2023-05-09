import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik} from 'formik';

import Button, {ButtonType} from 'components/Button';
import {Input} from 'components/FormElements';
import Modal from 'components/Modal';
import {login} from 'dispatchers/authentication';
import {AppDispatch, SFC} from 'types';
import yup, {signingKeySchema} from 'utils/yup';

export interface LogInModalProps {
  close(): void;
}

const LogInModal: SFC<LogInModalProps> = ({className, close}) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    signingKey: '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      await dispatch(login(values.signingKey));
      close();
    } catch (error) {
      console.error(error);
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      signingKey: signingKeySchema.required(),
    });
  }, []);

  return (
    <Modal className={className} close={close} header="Log In">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({dirty, errors, isSubmitting, touched, isValid}) => (
          <Form>
            <Input errors={errors} label="Signing Key" name="signingKey" touched={touched} />
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
    </Modal>
  );
};

export default LogInModal;
