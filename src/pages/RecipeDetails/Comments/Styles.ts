import {Form as UForm} from 'formik';
import styled from 'styled-components';

import UButton from 'components/Button';
import {InlineInput} from 'components/FormElements';

export const AmountInput = styled(InlineInput)`
  margin-left: 12px;
  width: 80px;
`;

export const Button = styled(UButton)`
  margin-left: 12px;
`;

export const Container = styled.div`
  margin-top: 20px;
  padding: 16px;
`;

export const Form = styled(UForm)`
  align-items: center;
  display: flex;
  margin-top: 16px;
`;

export const TextInput = styled(InlineInput)`
  flex: 1;
  margin-left: 12px;
`;
