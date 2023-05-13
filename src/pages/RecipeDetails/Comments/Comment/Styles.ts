import styled from 'styled-components';

import {fonts} from 'styles';

export const Container = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const DisplayName = styled.div`
  font-weight: ${fonts.weight.bold};
  margin-bottom: 2px;
`;

export const Right = styled.div`
  margin-left: 10px;
`;

export const Text = styled.div`
  line-height: 1.3;
`;
