import styled from 'styled-components';

import UCoinAmount from 'components/CoinAmount';
import {colors} from 'styles';

export const CoinAmount = styled(UCoinAmount)`
  border-radius: 6px;
  padding: 4px 6px;

  &:hover {
    background: ${colors.whiteHover};
    cursor: pointer;
  }
`;

export const CommentListLength = styled.div``;

export const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
