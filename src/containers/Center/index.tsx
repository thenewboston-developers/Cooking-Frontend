import {Route, Routes} from 'react-router-dom';

import CreateEditRecipe from 'pages/CreateEditRecipe';
import Feed from 'pages/Feed';
import Profile from 'pages/Profile';
import RecipeDetails from 'pages/RecipeDetails';
import {SFC} from 'types';
import * as S from './Styles';

const Center: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/createEditRecipe" element={<CreateEditRecipe />} />
        <Route path="/profile/:accountNumber" element={<Profile />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </S.Container>
  );
};

export default Center;
