import {ReactNode} from 'react';
import {toast} from 'react-toastify';

import Toast from 'components/Toast';
import {ToastType} from 'enums';

export const displayToast = (message: ReactNode, type: ToastType, className?: string): void => {
  toast(
    <Toast className={className} type={type}>
      {message}
    </Toast>,
  );
};
