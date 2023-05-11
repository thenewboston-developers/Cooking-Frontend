import styled from 'styled-components';

import {fonts} from 'styles';

export const Container = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin: 20px 24px;
  overflow: hidden;
`;

export const Img = styled.img`
  border-radius: 4px;
  height: auto;
  max-width: 140px;
  width: 100%;
`;

export const Name = styled.span`
  font-weight: ${fonts.weight.bold};
  margin-left: 12px;
`;

export const Recipe = styled.div`
  background: white;
  border-bottom: 1px solid #ccc;
  display: flex;
  padding: 8px;

  &:last-child {
    border-bottom: none;
  }
`;
