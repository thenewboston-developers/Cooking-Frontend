import {FC, useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';

import {SocketDataInternalMethod, SocketStatus} from 'enums';
import rootRouter from 'routers/rootRouter';
import {getSelf} from 'selectors/state';
import {AppDispatch} from 'types';

const WebSocket: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const socket = useMemo((): ReconnectingWebSocket => {
    return new ReconnectingWebSocket(`${process.env.REACT_APP_WS_URL}/ws/accounts/${self.accountNumber}`);
  }, [self.accountNumber]);

  const sendAuthenticateRequest = useCallback((): void => {
    socket.send(
      JSON.stringify({
        correlation_id: crypto.randomUUID(),
        method: SocketDataInternalMethod.authenticate_signing_key,
        signing_key: self.signingKey,
      }),
    );
  }, [self.signingKey, socket]);

  useEffect(() => {
    if (!socket) return;

    socket.onclose = () => {
      console.log(SocketStatus.disconnected);
    };

    socket.onmessage = (event) => {
      rootRouter(dispatch, event);
    };

    socket.onopen = () => {
      console.log(SocketStatus.connected);
      sendAuthenticateRequest();
    };

    return () => {
      socket.close();
    };
  }, [dispatch, sendAuthenticateRequest, socket]);

  return null;
};

export default WebSocket;
