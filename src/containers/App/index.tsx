import React from 'react';
import {Flip, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from 'containers/Layout';
import WebSocket from 'containers/WebSocket';
import {useIsAuthenticated} from 'hooks';

const App = () => {
  const isAuthenticated = useIsAuthenticated();

  const renderWebSocket = () => {
    if (!isAuthenticated) return null;
    return <WebSocket />;
  };

  return (
    <>
      <Layout />
      <ToastContainer
        autoClose={3000}
        closeOnClick
        draggable
        hideProgressBar
        newestOnTop
        pauseOnFocusLoss
        pauseOnHover
        position="top-right"
        rtl={false}
        transition={Flip}
      />
      {renderWebSocket()}
    </>
  );
};

export default App;
