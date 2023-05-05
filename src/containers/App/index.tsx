import React, {useEffect, useState} from 'react';
import axios from 'axios';

import RecipesList from 'containers/RecipesList';
import TopNav from 'containers/TopNav';
import * as S from './Styles';

const App = () => {
  const [data, setData] = useState(null);
  const [requestPending, setRequestPending] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setRequestPending(true)
        const response = await axios.get('http://127.0.0.1:8000/api/accounts');
        setData(response.data);
      } catch (error) {
        console.error(error);
        setData(null);
      } finally {
        setRequestPending(false)
      }
    })();
  }, []);

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
