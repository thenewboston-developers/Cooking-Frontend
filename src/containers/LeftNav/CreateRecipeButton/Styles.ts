import styled from 'styled-components';
import UIcon from '@mdi/react';

import {breakpoints, colors, fonts} from 'styles';

const HEIGHT = 48;

export const Container = styled.div`
  align-items: center;
  background: black;
  border-radius: ${`${HEIGHT / 2}px`};
  color: ${colors.white};
  display: flex;
  font-weight: ${fonts.weight.bold};
  height: ${`${HEIGHT}px`};
  justify-content: center;
  margin-top: 20px;
  padding: 0 12px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(208, 215, 222, 0.32);
    cursor: pointer;
    text-decoration: none;
  }
`;

export const Icon = styled(UIcon)`
  @media (min-width: ${breakpoints.desktop}) {
    display: none;
  }
`;

export const Text = styled.div`
  font-size: 20px;

  @media (max-width: ${breakpoints.desktop}) {
    display: none;
  }
`;
