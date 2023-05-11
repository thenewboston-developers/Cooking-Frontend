import {FC} from 'react';
import {Route, Routes} from 'react-router-dom';

import TopNav from 'containers/TopNav';
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import * as S from './Styles';

const Layout: FC = () => {
  return (
    <S.Container>
      <TopNav />
      <S.MainContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile/" element={<Profile />} />
        </Routes>
      </S.MainContent>
    </S.Container>
  );
};

export default Layout;
