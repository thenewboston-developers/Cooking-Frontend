import {FC, useCallback, useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';

import {getSelf} from 'selectors/state';

enum SocketStatus {
  authenticated = 'authenticated',
  connected = 'connected',
  disconnected = 'disconnected',
  error = 'error',
}

const WebSocket: FC = () => {
  const self = useSelector(getSelf);

  const socket = useMemo((): ReconnectingWebSocket => {
    return new ReconnectingWebSocket(`ws://127.0.0.1:8000/ws/accounts/${self.accountNumber}`);
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
