import styled from 'styled-components';

import ULeft from './Left';
import URight from './Right';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 320px auto;
  overflow: hidden;
`;

export const Left = styled(ULeft)`
  grid-column: 1 / span 1;
  overflow-y: auto;
  padding: 20px 0 20px 24px;
`;

export const Right = styled(URight)`
  grid-column: 2 / span 1;
  overflow-y: auto;
  padding: 20px 24px;
`;
