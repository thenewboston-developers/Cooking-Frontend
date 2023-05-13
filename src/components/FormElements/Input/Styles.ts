import {Field as UField} from 'formik';
import styled from 'styled-components';

import {colors} from 'styles';

export const ErrorMessage = styled.div`
  color: ${colors.palette.red['500']};
  font-size: 12px;
  margin-top: 6px;
`;

export const Field = styled(UField)`
  background: #f1f6fa;
  border-radius: 3px;
  border: 1px solid ${({$error}) => ($error ? colors.palette.red['500'] : 'transparent')};
  display: block;
  height: 40px;
  padding: 10px 14px;
  width: 260px;

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const Label = styled.div`
  font-size: 12px;
  margin-bottom: 8px;
`;

export const SecondaryContainer = styled.div`
  margin-bottom: 32px;
`;
