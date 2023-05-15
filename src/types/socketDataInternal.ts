import {SocketDataInternalMethod} from 'enums';

export interface CorrelationId {
  correlation_id: string;
}

export interface AuthenticateRequest extends CorrelationId {
  method: SocketDataInternalMethod.authenticate;
  token: string;
}

export interface AuthenticateResponse extends CorrelationId {
  return_value: boolean;
}

export interface AuthenticateSigningKeyRequest extends CorrelationId {
  method: SocketDataInternalMethod.authenticate;
  token: string;
}

export interface AuthenticateSigningKeyResponse extends CorrelationId {
  return_value: boolean;
}

export type SocketDataInternal = AuthenticateResponse | AuthenticateSigningKeyResponse;
