import {createGlobalStyle} from 'styled-components';

import fonts from 'styles/fonts';

const ToastifyStyle = createGlobalStyle`
  .Toastify {
    &__close-button {
      && {
        display: none;
      }
    }

    &__toast {
      && {
        border-radius: 3px;
        box-shadow: 0 0 3px rgba(4, 34, 53, 0.3);
        min-height: 42px;
        padding: 0;
      }
    }

    &__toast-container {
      && {
        width: 300px;
        padding: 0;
      }
    }

    &__toast-body {
      font-family: ${fonts.family.default};

      && {
        padding: 0;
      }
    }
  }
`;

export default ToastifyStyle;
