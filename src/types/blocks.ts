export interface Block extends UnsignedBlock {
  signature: string;
}

export interface UnsignedBlock {
  amount: number;
  id: string;
  payload: any;
  recipient: string;
  sender: string;
  transaction_fee: number;
}
