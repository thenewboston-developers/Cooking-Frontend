import React from 'react';
import {Flip, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RecipesList from 'containers/RecipesList';
import TopNav from 'containers/TopNav';
import * as S from './Styles';

const App = () => {
  return (
    <>
      <S.Container>
        <TopNav />
        <S.MainContent>
          <RecipesList />
        </S.MainContent>
      </S.Container>
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
    </>
  );
};

export default App;
