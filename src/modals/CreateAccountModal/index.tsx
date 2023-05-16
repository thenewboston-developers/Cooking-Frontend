import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import axios from 'axios';

import CopyContainer from 'components/CopyContainer';
import {login} from 'dispatchers/authentication';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import * as S from './Styles';

export interface CreateAccountModalProps {
  close(): void;
}

interface AccountData {
  account_number: string;
  balance: number;
  display_image: string;
  display_name: string;
}

interface ResponseData {
  account: AccountData;
  signing_key: string;
}

const CreateAccountModal: SFC<CreateAccountModalProps> = ({className, close}) => {
  const [data, setData] = useState<ResponseData | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post<ResponseData>(`${process.env.REACT_APP_API_URL}/api/accounts`, {});
        await dispatch(login(response.data.signing_key));
        setData(response.data);
      } catch (error) {
        console.error(error);
        displayErrorToast('Error creating account');
      }
    })();
  }, [dispatch]);

  const renderResults = () => {
    if (!data) return null;

    return (
      <>
        <S.Text>
          Your <b>account number</b> is your unique identifier for thenewboston ecosystem. Log in to your account using
          your <b>signing key</b>. Do not share your signing key with anyone else!
        </S.Text>
        <S.Label>Account Number</S.Label>
        <CopyContainer text={data.account.account_number} />
        <S.Label>Signing Key</S.Label>
        <CopyContainer text={data.signing_key} />
      </>
    );
  };

  return (
    <S.Modal className={className} close={close} header="New account created!">
      {renderResults()}
    </S.Modal>
  );
};

export default CreateAccountModal;
