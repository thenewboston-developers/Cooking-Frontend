import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';

import App from 'containers/App';
import store from 'store';
import GlobalStyle from 'styles/components/GlobalStyle';
import ToastifyStyle from 'styles/components/ToastifyStyle';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <GlobalStyle />
    <ToastifyStyle />
    <App />
  </Provider>,
);
