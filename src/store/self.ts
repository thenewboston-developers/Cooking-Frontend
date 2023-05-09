import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {SELF} from 'store/constants';
import {Self} from 'types';

const initialState: Self = {
  accountNumber: '',
  balance: 0,
  displayImage: '',
  displayName: '',
  signingKey: '',
};

const self = createSlice({
  initialState,
  name: SELF,
  reducers: {
    setSelf: (state: Self, {payload}: PayloadAction<Self>) => {
      return payload;
    },
    updateSelf: (state: Self, {payload}: PayloadAction<Partial<Self>>) => {
      Object.assign(state, payload);
    },
  },
});

export const {setSelf, updateSelf} = self.actions;
export default self.reducer;
