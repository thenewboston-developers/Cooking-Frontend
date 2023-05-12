import {FC} from 'react';
import {Route, Routes} from 'react-router-dom';

import TopNav from 'containers/TopNav';
import CreateEditRecipe from 'pages/CreateEditRecipe';
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import RecipeDetails from 'pages/RecipeDetails';
import * as S from './Styles';

const Layout: FC = () => {
  return (
    <S.Container>
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createEditRecipe" element={<CreateEditRecipe />} />
        <Route path="/profile/:accountNumber" element={<Profile />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </S.Container>
  );
};

export default Layout;
