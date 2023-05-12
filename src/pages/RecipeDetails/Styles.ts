import styled from 'styled-components';

import {cardStyle, fonts} from 'styles';

export const Card = styled.div`
  ${cardStyle};
  margin-top: 32px;
  padding: 16px;
`;

export const Container = styled.div`
  margin: 0 auto;
  width: 80%;
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

export const Name = styled.span`
  font-size: 24px;
  font-weight: ${fonts.weight.black};
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
