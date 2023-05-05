import React from 'react';
import ReactDOM from 'react-dom/client';

// Styles
import 'normalize.css';

import App from './containers/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
