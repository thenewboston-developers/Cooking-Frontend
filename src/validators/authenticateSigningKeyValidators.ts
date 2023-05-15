import yup from 'utils/yup';

export const authenticateSigningKeyValidator = yup
  .object({
    correlation_id: yup.string().required(),
    return_value: yup
      .boolean()
      .required()
      .test('is-authenticated', 'Authentication failed', (return_value: any) => !!return_value),
  })
  .noUnknown();
