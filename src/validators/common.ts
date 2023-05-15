import {Self} from 'types';

export const validateIsSelfAccountNumber = (accountNumber: string, self: Self) => {
  if (accountNumber !== self.accountNumber) throw new Error('Invalid account number');
};
