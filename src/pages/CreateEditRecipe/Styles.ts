import styled from 'styled-components';

import {Input as UInput} from 'components/FormElements';
import {colors} from 'styles';

export const Card = styled.div`
  background: ${colors.white};
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin-top: 32px;
  padding: 16px;
`;

export const Container = styled.div`
  margin: 0 auto;
  width: 420px;
`;

export const Input = styled(UInput)`
  width: 100%;
`;
