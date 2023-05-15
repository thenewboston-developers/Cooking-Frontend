export enum SocketDataInternalMethod {
  authenticate = 'authenticate',
  authenticate_signing_key = 'authenticate_signing_key',
  get_peers = 'get_peers',
  set_peers = 'set_peers',
}

export enum SocketDataStandardType {
  createBlock = 'create.block',
  trackOnlineStatus = 'track.online_status',
  updateAccount = 'update.account',
}

export enum SocketStatus {
  authenticated = 'authenticated',
  connected = 'connected',
  disconnected = 'disconnected',
  error = 'error',
}
