import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const BottomText = styled.div`
  color: ${colors.secondary};
  font-size: 12px;
`;

export const Container = styled.div`
  display: flex;
`;

export const DisplayName = styled.div`
  font-weight: ${fonts.weight.bold};
  margin-bottom: 2px;
`;

export const Right = styled.div`
  margin-left: 10px;
`;
