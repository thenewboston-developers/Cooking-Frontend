import {FC, useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';

import {SocketDataInternalMethod} from 'enums';
import rootRouter from 'routers/rootRouter';
import {getSelf} from 'selectors/state';
import {AppDispatch, AuthenticateSigningKeyRequest} from 'types';

const WebSocket: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const socket = useMemo((): ReconnectingWebSocket => {
    return new ReconnectingWebSocket(`${process.env.REACT_APP_WS_URL}/ws/accounts/${self.accountNumber}`);
  }, [self.accountNumber]);

  const sendAuthenticateRequest = useCallback((): void => {
    const payload: AuthenticateSigningKeyRequest = {
      correlation_id: crypto.randomUUID(),
      method: SocketDataInternalMethod.authenticate_signing_key,
      signing_key: self.signingKey,
    };

    socket.send(JSON.stringify(payload));
  }, [self.signingKey, socket]);

  useEffect(() => {
    if (!socket) return;

    socket.onclose = () => {};

    socket.onmessage = (event) => {
      rootRouter(dispatch, event);
    };

    socket.onopen = () => {
      sendAuthenticateRequest();
    };

    return () => {
      socket.close();
    };
  }, [dispatch, sendAuthenticateRequest, socket]);

  return null;
};

export default WebSocket;
