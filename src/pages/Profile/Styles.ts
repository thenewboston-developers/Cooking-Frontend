import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 280px auto;
  overflow: hidden;
`;

export const Left = styled.div`
  grid-column: 1 / span 1;
  overflow-y: auto;
  padding: 20px 0 20px 24px;
`;

export const Right = styled.div`
  grid-column: 2 / span 1;
  overflow-y: auto;
  padding: 20px 24px;
`;
