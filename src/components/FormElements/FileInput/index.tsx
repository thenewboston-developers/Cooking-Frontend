import {ChangeEvent, FC} from 'react';
import {ErrorMessage, FieldProps, useField} from 'formik';
import * as S from './Styles';

const FileInput: FC<FieldProps<File | null>> = ({field, form, ...props}) => {
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
      <S.SecondaryContainer>
        <ErrorMessage name={field.name} component={S.ErrorMessage} />
      </S.SecondaryContainer>
    </>
  );
};

export default FileInput;
