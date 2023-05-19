import styled from 'styled-components';

import UAccountCard from 'components/AccountCard';
import UCoinAmount from 'components/CoinAmount';
import {breakpoints, colors, fonts} from 'styles';

export const AccountCard = styled(UAccountCard)`
  margin-top: 24px;
`;

export const CoinAmount = styled(UCoinAmount)`
  margin-top: 8px;
`;

export const Container = styled.div`
  border-bottom: 1px solid ${colors.border};
  display: grid;
  gap: 12px;
  grid-template-areas: 'ImgContainer Details Right';
  grid-template-columns: 3fr 7fr auto;
  padding: 16px;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 4fr 6fr auto;
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: auto auto;
    grid-template-areas:
      'ImgContainer Right'
      'Details Right';
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const Description = styled.span`
  color: ${colors.secondary};
  font-size: 15px;
  line-height: 1.3;
  margin-top: 4px;
`;

export const Details = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  grid-area: Details;
`;

export const Img = styled.img`
  border-radius: 6px;
  height: 100%;
  object-fit: cover;
  position: absolute;
  width: 100%;
`;

export const ImgContainer = styled.div`
  grid-area: ImgContainer;
`;

export const ImgWrapper = styled.div`
  padding-bottom: 75%; /* 4:3 aspect ratio */
  position: relative;
`;

export const Name = styled.span`
  font-size: 18px;
  font-weight: ${fonts.weight.bold};
`;

export const Right = styled.div`
  grid-area: Right;
`;
