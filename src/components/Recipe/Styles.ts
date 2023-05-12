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
  height: 100%;
  object-fit: cover;
  position: absolute;
  width: 100%;
`;

export const ImgContainer = styled.div`
  flex-basis: 260px;
`;

export const ImgWrapper = styled.div`
  padding-bottom: 75%; /* 4:3 aspect ratio */
  position: relative;
`;

export const Name = styled.span`
  font-size: 15px;
  font-weight: ${fonts.weight.bold};
`;

export const Right = styled.span`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 12px;
`;
