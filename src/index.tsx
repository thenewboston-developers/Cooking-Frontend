import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'

// Styles
import 'normalize.css';

import App from 'containers/App';
import store from 'store';
import ToastifyStyle from 'styles/components/ToastifyStyle';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <ToastifyStyle />
    <App />
  </Provider>
);
