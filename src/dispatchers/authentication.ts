import axios from 'axios';

import {setAuthentication} from 'store/authentication';
import {setSelf} from 'store/self';
import {AppDispatch} from 'types/store';

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
  const {data} = await axios.post<LoginResponse>('http://127.0.0.1:8000/login', {
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
