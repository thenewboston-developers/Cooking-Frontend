import React from 'react';

import RecipesList from 'containers/RecipesList';
import TopNav from 'containers/TopNav';
import * as S from './Styles';

const App = () => {
  return (
    <S.Container>
      <TopNav />
      <S.MainContent>
        <RecipesList />
      </S.MainContent>
    </S.Container>
  );
};

export default App;
