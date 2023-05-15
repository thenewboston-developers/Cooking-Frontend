import {SocketDataStandardType} from 'enums';
import {Block} from 'types/blocks';

export interface CreateBlockData {
  message: Block;
  type: SocketDataStandardType.createBlock;
}

export interface TrackOnlineStatusData {
  account_number: string;
  is_online: boolean;
  type: SocketDataStandardType.trackOnlineStatus;
}

export interface UpdateAccountData {
  message: UpdateAccountMessage;
  type: SocketDataStandardType.updateAccount;
}

export interface UpdateAccountMessage {
  account_number: string;
  balance: number;
}

export type SocketDataStandard = CreateBlockData | TrackOnlineStatusData | UpdateAccountData;
