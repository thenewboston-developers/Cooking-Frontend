import {IdentificationData} from 'types/identification';
import {TnbKeyPair} from 'types/signing';

export interface Self extends IdentificationData, TnbKeyPair {
  balance: number;
}
