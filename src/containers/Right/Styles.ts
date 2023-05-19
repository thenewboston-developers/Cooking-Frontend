import styled from 'styled-components';

import UDropdownMenu from 'components/DropdownMenu';
import {hiddenScroll} from 'styles';

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Container = styled.div`
  align-items: flex-start;
  display: flex;
  padding: 24px 0 0 16px;
  ${hiddenScroll};
`;

export const DropdownMenu = styled(UDropdownMenu)`
  margin-left: 8px;
`;
