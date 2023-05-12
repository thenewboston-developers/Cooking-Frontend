import axios from 'axios';

import {updateSelf} from 'store/self';
import {AppDispatch, IdentificationData} from 'types';
import {authorizationHeaders} from 'utils/authentication';

interface EditAccountResponse {
  account_number: string;
  balance: number;
  display_image: string;
  display_name: string;
}

export const editAccount = (accountNumber: string, values: IdentificationData) => async (dispatch: AppDispatch) => {
  const requestData = {
    display_image: values.displayImage,
    display_name: values.displayName,
  };

  const {data} = await axios.patch<EditAccountResponse>(
    `${process.env.REACT_APP_API_URL}/api/accounts/${accountNumber}`,
    requestData,
    authorizationHeaders(),
  );

  dispatch(
    updateSelf({
      displayImage: data.display_image,
      displayName: data.display_name,
    }),
  );
};
