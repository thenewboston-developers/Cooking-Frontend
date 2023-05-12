import styled from 'styled-components';

import {cardStyle, fonts} from 'styles';

export const Card = styled.div`
  ${cardStyle};
  padding: 16px;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: auto 320px;
  overflow-y: auto;
`;

export const Details = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
`;

export const Img = styled.img`
  border-radius: 6px;
  height: auto;
  margin-top: 16px;
  max-width: 100%;
`;

export const Left = styled.div`
  grid-column: 1 / span 1;
  padding: 20px 10px 20px 24px;
`;

export const Name = styled.span`
  font-size: 24px;
  font-weight: ${fonts.weight.black};
`;

export const Right = styled.div`
  grid-column: 2 / span 1;
  padding: 20px 24px 20px 10px;
`;

export const SectionContent = styled.div`
  line-height: 1.3;
  margin-top: 4px;
`;

export const SectionLabel = styled.div`
  font-size: 18px;
  font-weight: ${fonts.weight.bold};
  margin-top: 16px;
`;

export const Top = styled.div`
  display: flex;
`;

export const TopLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const TopRight = styled.div`
  margin-left: 12px;
`;
