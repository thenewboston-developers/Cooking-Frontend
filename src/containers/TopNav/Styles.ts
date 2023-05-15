import styled from 'styled-components';

import UDropdownMenu from 'components/DropdownMenu';
import {colors} from 'styles';

export const Avatar = styled.img`
  border-radius: 50%;
  height: 32px;
  margin-left: 16px;
  width: 32px;
`;

export const BalanceGraphic = styled.img`
  height: 22px;
  width: 22px;
`;

export const BalanceText = styled.div`
  color: ${colors.secondary};
  font-size: 13px;
  margin-left: 4px;
`;

export const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
`;

export const Container = styled.div`
  align-items: center;
  background: ${colors.white};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  padding: 8px 24px;
`;

export const DropdownMenu = styled(UDropdownMenu)`
  margin-left: 8px;
`;

export const Left = styled.div``;

export const Logo = styled.img`
  height: 36px;
`;

export const Right = styled.div`
  align-items: center;
  display: flex;
`;
