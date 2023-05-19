import styled from 'styled-components';

import {breakpoints} from 'styles';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  height: 100vh;
  margin: auto;
  max-width: 1400px;
  overflow: hidden;

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: min-content 1fr;
  }
`;
