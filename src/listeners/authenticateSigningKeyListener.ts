import axios from 'axios';

import {SocketDataInternalMethod} from 'enums';
import {store} from 'store';
import {updateSelf} from 'store/self';
import {AppDispatch, GetAccountResponse, SocketDataInternal} from 'types';
import {displayErrorToast} from 'utils/toast';
import {authenticateSigningKeyValidator} from 'validators/authenticateSigningKeyValidators';

const authenticateSigningKeyListener = (dispatch: AppDispatch, socketData: SocketDataInternal) => {
  (async () => {
    try {
      const {self} = store.getState();

      await authenticateSigningKeyValidator.validate(socketData);

      try {
        const {data} = await axios.get<GetAccountResponse>(
          `${process.env.REACT_APP_API_URL}/api/accounts/${self.accountNumber}`,
        );
        dispatch(updateSelf({balance: data.balance}));
      } catch (error) {
        dispatch(updateSelf({balance: 0}));
      }
    } catch (error) {
      console.error(error);
      displayErrorToast(`Invalid ${SocketDataInternalMethod.authenticate_signing_key} response received`);
    }
  })();
};

export default authenticateSigningKeyListener;
