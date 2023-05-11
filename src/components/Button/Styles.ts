import styled, {css} from 'styled-components';
import UIcon from '@mdi/react';

import {colors, fonts} from 'styles';
import {ButtonColor} from './types';

const BUTTON_HEIGHT = 36;

const dangerMixin = css`
  background-color: ${colors.palette.red['500']};

  &:hover {
    background: ${colors.palette.red['400']};
  }
`;

const disabledMixin = css`
  background: ${colors.palette.blue['500']};
  cursor: not-allowed;
  opacity: 0.65;

  &:hover {
    background: ${colors.palette.blue['500']};
  }
`;

const hasIconMixin = css`
  align-items: center;
  border-radius: 6px;
  display: flex;
  width: auto;
`;

const successMixin = css`
  background-color: ${colors.palette.green['300']};

  &:hover {
    background: ${colors.palette.green['400']};
  }
`;

export const Button = styled.button<{$color: ButtonColor; hasIcon: boolean}>`
  background: ${colors.palette.blue['500']};
  border-radius: ${`${BUTTON_HEIGHT / 2}px`};
  border: 1px solid transparent;
  color: #fff;
  cursor: pointer;
  display: block;
  font-family: ${fonts.family.default};
  font-size: 14px;
  font-weight: ${fonts.weight.regular};
  height: ${`${BUTTON_HEIGHT}px`};
  padding: 0 12px;

  &:hover {
    background: ${colors.palette.blue['400']};
  }

  ${({$color}) => {
    if ($color === ButtonColor.danger) return dangerMixin;
    if ($color === ButtonColor.success) return successMixin;
    return;
  }}

  ${({disabled}) => disabled && disabledMixin}

  ${({hasIcon}) => hasIcon && hasIconMixin}
`;

export const IconLeft = styled(UIcon)`
  margin-right: 6px;
`;

export const IconRight = styled(UIcon)`
  margin-left: 6px;
`;
