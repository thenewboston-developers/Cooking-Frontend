import styled from 'styled-components';

import {Input as UInput} from 'components/FormElements';
import {cardStyle} from 'styles';

export const Card = styled.div`
  ${cardStyle};
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
