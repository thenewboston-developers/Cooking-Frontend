import styled from 'styled-components';

import {colors} from 'styles';

export const Avatar = styled.img`
  border-radius: 50%;
  height: 32px;
  width: 32px;
`;

export const Container = styled.div`
  align-items: center;
  background: ${colors.white};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  padding: 8px 24px;
`;

export const Left = styled.div``;

export const Logo = styled.img`
  height: 36px;
`;

export const Right = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
`;
