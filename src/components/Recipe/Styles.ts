import styled from 'styled-components';

import UAccountCard from 'components/AccountCard';
import {cardStyle, colors, fonts} from 'styles';

export const AccountCard = styled(UAccountCard)`
  margin-top: 16px;
`;

export const Container = styled.div`
  ${cardStyle};
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

export const Middle = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 12px;
`;

export const Name = styled.span`
  font-size: 15px;
  font-weight: ${fonts.weight.bold};
`;

export const Right = styled.div`
  margin-left: 12px;
`;
