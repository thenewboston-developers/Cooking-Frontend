import axios from 'axios';

import {resetAuthentication, setAuthentication} from 'store/authentication';
import {resetSelf, setSelf} from 'store/self';
import {AppDispatch} from 'types';

interface LoginResponse {
  account: {
    account_number: string;
    balance: number;
    display_image: string;
    display_name: string;
  };
  authentication: {
    access_token: string;
    refresh_token: string;
  };
}

export const login = (signingKey: string) => async (dispatch: AppDispatch) => {
  const {data} = await axios.post<LoginResponse>(`${process.env.REACT_APP_API_URL}/login`, {
    signing_key: signingKey,
  });

  const {
    account: {account_number, balance, display_image, display_name},
    authentication: {access_token, refresh_token},
  } = data;

  dispatch(
    setAuthentication({
      accessToken: access_token,
      refreshToken: refresh_token,
    }),
  );

  dispatch(
    setSelf({
      accountNumber: account_number,
      balance,
      displayImage: display_image,
      displayName: display_name,
      signingKey,
    }),
  );
};

export const logout = () => async (dispatch: AppDispatch) => {
  dispatch(resetAuthentication());
  dispatch(resetSelf());
};
