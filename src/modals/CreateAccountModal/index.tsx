import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import axios from 'axios';

import CopyContainer from 'components/CopyContainer';
import Modal from 'components/Modal';
import {login} from 'dispatchers/authentication';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';

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
        dispatch(login(response.data.signing_key));
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
        <CopyContainer text={data.account.account_number} />
        <CopyContainer text={data.signing_key} />
      </>
    );
  };

  return (
    <Modal className={className} close={close} header="New account created!">
      {renderResults()}
    </Modal>
  );
};

export default CreateAccountModal;
