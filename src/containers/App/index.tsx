import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import axios from 'axios';

import RecipesList from 'containers/RecipesList';
import TopNav from 'containers/TopNav';
import {setAccessToken} from 'store/authentication';
import {AppDispatch} from 'types';
import * as S from './Styles';

const App = () => {
  const [data, setData] = useState(null);
  const [requestPending, setRequestPending] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      try {
        setRequestPending(true)
        const response = await axios.get('http://127.0.0.1:8000/api/accounts');
        setData(response.data);
        dispatch(setAccessToken('hey'));
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
