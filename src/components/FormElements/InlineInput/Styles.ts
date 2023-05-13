import {Field as UField} from 'formik';
import styled from 'styled-components';

import {colors} from 'styles';

export const Field = styled(UField)`
  background: #f1f6fa;
  border-radius: 3px;
  border: 1px solid ${({$error}) => ($error ? colors.palette.red['500'] : 'transparent')};
  height: 40px;
  padding: 10px 14px;
  width: ${({width}) => (width ? `${width}px` : '260px')};
`;
