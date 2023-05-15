import {store} from 'store';
import {updateSelf} from 'store/self';
import {AppDispatch, SocketDataStandard} from 'types';
import {displayErrorToast} from 'utils/toast';
import {validateIsSelfAccountNumber} from 'validators/common';
import {updateAccountValidator} from 'validators/updateAccountValidators';

const updateAccountListener = (dispatch: AppDispatch, socketData: SocketDataStandard) => {
  (async () => {
    try {
      const {self} = store.getState();

      const {message} = await updateAccountValidator.validate(socketData);
      validateIsSelfAccountNumber(message.account_number, self);

      dispatch(updateSelf({balance: message.balance}));
    } catch (error) {
      console.error(error);
      displayErrorToast('Error updating account data');
    }
  })();
};

export default updateAccountListener;
