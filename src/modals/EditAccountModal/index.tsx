import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik} from 'formik';

import Button, {ButtonType} from 'components/Button';
import {editAccount} from 'dispatchers/accounts';
import {getSelf} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import yup from 'utils/yup';
import * as S from './Styles';

export interface EditAccountModalProps {
  close(): void;
}

const EditAccountModal: SFC<EditAccountModalProps> = ({className, close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const initialValues = {
    displayImage: self.displayImage || '',
    displayName: self.displayName || '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      await dispatch(editAccount(self.accountNumber, values));
      close();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error editing account');
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      displayImage: yup.string().url().required(),
      displayName: yup.string().required(),
    });
  }, []);

  return (
    <S.Modal className={className} close={close} header="Edit account">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({dirty, errors, isSubmitting, touched, isValid}) => (
          <Form>
            <S.Input errors={errors} label="Avatar URL" name="displayImage" touched={touched} />
            <S.Input errors={errors} label="Display Name" name="displayName" touched={touched} />
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

export default EditAccountModal;
