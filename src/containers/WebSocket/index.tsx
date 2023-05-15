import {FC, useCallback, useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';

import {SocketStatus} from 'enums';
import {getSelf} from 'selectors/state';

const WebSocket: FC = () => {
  const self = useSelector(getSelf);

  const socket = useMemo((): ReconnectingWebSocket => {
    return new ReconnectingWebSocket(`${process.env.REACT_APP_WS_URL}/ws/accounts/${self.accountNumber}`);
  }, [self.accountNumber]);

  const sendAuthenticateRequest = useCallback((): void => {
    socket.send(
      JSON.stringify({
        correlation_id: crypto.randomUUID(),
        method: 'authenticate_signing_key',
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
      console.log(event);
    };

    socket.onopen = () => {
      console.log(SocketStatus.connected);
      sendAuthenticateRequest();
    };

    return () => {
      socket.close();
    };
  }, [sendAuthenticateRequest, socket]);

  return null;
};

export default WebSocket;
