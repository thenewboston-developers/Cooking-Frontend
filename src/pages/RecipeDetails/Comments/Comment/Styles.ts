import styled from 'styled-components';

import UCoinAmount from 'components/CoinAmount';
import {colors, fonts} from 'styles';

export const CoinAmount = styled(UCoinAmount)`
  margin-top: 4px;
`;

export const Container = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const Date = styled.div`
  color: ${colors.secondary};
  font-size: 12px;
`;

export const DisplayName = styled.div`
  font-weight: ${fonts.weight.bold};
`;

export const Dot = styled.div`
  color: ${colors.secondary};
  font-size: 12px;
  margin: 0 4px;
`;

export const Middle = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 10px;
`;

export const NameDateContainer = styled.div`
  align-items: baseline;
  display: flex;
`;

export const Right = styled.div`
  margin-left: 10px;
`;

export const Text = styled.div`
  line-height: 1.3;
  margin-top: 2px;
`;
