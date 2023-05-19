import styled from 'styled-components';

import {colors, hiddenScroll} from 'styles';

export const Container = styled.div`
  border-right: 1px solid ${colors.border};
  padding: 8px 0 24px;
  ${hiddenScroll};
`;
