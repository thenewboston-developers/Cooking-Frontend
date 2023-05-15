import noop from 'lodash/noop';

import {SocketDataStandardType} from 'enums';
import updateAccountListener from 'listeners/updateAccountListener';
import {AppDispatch, SocketDataStandard} from 'types';
import {displayErrorToast} from 'utils/toast';

const socketDataStandardRouter = (dispatch: AppDispatch, socketData: SocketDataStandard) => {
  const {type} = socketData;

  const handlers = {
    [SocketDataStandardType.createBlock]: noop,
    [SocketDataStandardType.trackOnlineStatus]: noop,
    [SocketDataStandardType.updateAccount]: updateAccountListener,
  };

  const handler = handlers[type];

  if (!handler) {
    displayErrorToast(`${type} is an unknown type`);
    return;
  }

  handler(dispatch, socketData);
};

export default socketDataStandardRouter;
