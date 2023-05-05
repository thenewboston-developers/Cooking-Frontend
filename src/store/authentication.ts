import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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
    setAccessToken: (state: Authentication, {payload}: PayloadAction<string | null>) => {
      state.accessToken = payload
    },
    setRefreshToken: (state: Authentication, {payload}: PayloadAction<string | null>) => {
      state.refreshToken = payload
    }
  },
});

export const {setAccessToken, setRefreshToken} = authentication.actions;
export default authentication.reducer;
