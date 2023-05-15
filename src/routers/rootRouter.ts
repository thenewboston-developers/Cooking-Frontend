import authenticateSigningKeyListener from 'listeners/authenticateSigningKeyListener';
import socketDataStandardRouter from 'routers/socketDataStandardRouter';
import {AppDispatch, SocketData, SocketDataInternal, SocketDataStandard} from 'types';

const rootRouter = (dispatch: AppDispatch, event: MessageEvent) => {
  const socketData: SocketData = JSON.parse(event.data);

  if (socketData.hasOwnProperty('correlation_id')) {
    authenticateSigningKeyListener(dispatch, socketData as SocketDataInternal);
  } else {
    socketDataStandardRouter(dispatch, socketData as SocketDataStandard);
  }
};

export default rootRouter;
