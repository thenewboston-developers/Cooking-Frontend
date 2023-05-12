import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.div`
  color: ${colors.secondary};
  font-size: 11px;
`;

export const Value = styled.div`
  font-size: 12px;
  font-weight: ${fonts.weight.regular};
  margin-top: 2px;
`;
