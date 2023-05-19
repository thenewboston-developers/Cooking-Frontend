import styled from 'styled-components';

import {fonts} from 'styles';

export const Container = styled.div`
  padding: 16px 24px 24px;
`;

export const Details = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 12px;
`;

export const EmptyStateWrapper = styled.div`
  margin: 20px 24px;
`;

export const Img = styled.img`
  border-radius: 6px;
  height: auto;
  margin-top: 20px;
  max-height: 600px;
  max-width: 100%;
`;

export const Name = styled.span`
  font-size: 32px;
  font-weight: ${fonts.weight.bold};
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
