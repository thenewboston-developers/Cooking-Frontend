import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Container = styled.div`
  background: ${colors.white};
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  padding: 16px;
`;

export const Description = styled.span`
  color: ${colors.secondary};
  font-size: 15px;
  margin-top: 6px;
`;

export const Img = styled.img`
  border-radius: 6px;
  height: auto;
  max-width: 200px;
  width: 100%;
`;

export const Name = styled.span`
  font-size: 15px;
  font-weight: ${fonts.weight.bold};
`;

export const Right = styled.span`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;
