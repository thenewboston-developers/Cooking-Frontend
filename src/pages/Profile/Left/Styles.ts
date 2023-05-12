import styled from 'styled-components';

import {fonts} from 'styles';

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Img = styled.img`
  border-radius: 6px;
  height: 100%;
  object-fit: cover;
  position: absolute;
  width: 100%;
`;

export const ImgWrapper = styled.div`
  padding-bottom: 100%;
  position: relative;
  width: 100%;
`;

export const Name = styled.span`
  font-size: 24px;
  font-weight: ${fonts.weight.black};
  margin-top: 12px;
`;
