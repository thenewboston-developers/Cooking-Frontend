import {createSlice} from '@reduxjs/toolkit';

import {AUTHENTICATION} from 'store/constants';
import {Authentication} from 'types';

const initialState: Authentication = {
  accessToken: null,
  refreshToken: null,
};

const authentication = createSlice({
  initialState,
  name: AUTHENTICATION,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload
    }
  },
});

export const {setAccessToken, setRefreshToken} = authentication.actions;
export default authentication.reducer;
