import axios from 'axios';

import {updateSelf} from 'store/self';
import {AppDispatch, EditAccountResponse, IdentificationData} from 'types';
import {authorizationHeaders} from 'utils/authentication';

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
