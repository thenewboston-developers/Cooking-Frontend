import styled from 'styled-components';
import {mdiAlertCircleOutline, mdiCheckCircle} from '@mdi/js';

import Icon from 'components/Icon';
import {ToastType} from 'enums';

export const Container = styled.div<{type: ToastType}>`
  background-color: ${({type}) => {
    if (type === ToastType.success) {
      return '#1ea672';
    }
    if (type === ToastType.warning) {
      return '#d97917';
    }
    return '#ed5f74';
  }};
  display: flex;
  padding: 12px;
`;

export const Text = styled.span`
  align-items: center;
  color: #fff;
  display: flex;
`;

const iconProps = `
  color: #fff;
  margin-right: 12px;
`;

export const AlertCircleOutlineIcon = styled(Icon).attrs(() => ({icon: mdiAlertCircleOutline}))`
  ${iconProps}
`;

export const CheckCircleIcon = styled(Icon).attrs(() => ({icon: mdiCheckCircle}))`
  ${iconProps}
`;
