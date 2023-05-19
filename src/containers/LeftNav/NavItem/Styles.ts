import {Link} from 'react-router-dom';
import styled from 'styled-components';
import UIcon from '@mdi/react';

import {fonts} from 'styles';

const HEIGHT = 48;

export const Container = styled(Link)<{isActive: boolean}>`
  align-items: center;
  background: ${({isActive}) => (isActive ? 'rgba(208, 215, 222, 0.32)' : 'transparent')};
  border-radius: ${`${HEIGHT / 2}px`};
  display: flex;
  font-weight: ${({isActive}) => (isActive ? fonts.weight.black : fonts.weight.regular)};
  height: ${`${HEIGHT}px`};
  padding: 0 12px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(208, 215, 222, 0.32);
    text-decoration: none;
  }
`;

export const Icon = styled(UIcon)``;

export const Text = styled.div`
  font-size: 20px;
  margin-left: 20px;
`;
