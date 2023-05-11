import styled from 'styled-components';

import {fonts} from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Img = styled.img`
  border-radius: 6px;
  height: auto;
  width: 100%;
`;

export const Name = styled.span`
  font-size: 24px;
  font-weight: ${fonts.weight.black};
  margin-top: 12px;
`;
