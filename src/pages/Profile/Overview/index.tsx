import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import DefaultAvatar from 'assets/default-avatar.png';
import Button, {ButtonColor} from 'components/Button';
import Loader from 'components/Loader';
import {useIsAuthenticated, useToggle} from 'hooks';
import EditAccountModal from 'modals/EditAccountModal';
import {getSelf} from 'selectors/state';
import {GetAccountResponse, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import * as S from './Styles';

const Overview: SFC = ({className}) => {
  const [editAccountModalIsOpen, toggleEditAccountModal] = useToggle(false);
  const [displayBalance, setDisplayBalance] = useState<number>(0);
  const [displayImage, setDisplayImage] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [requestPending, setRequestPending] = useState<boolean>(false);
  const {accountNumber} = useParams();
  const isAuthenticated = useIsAuthenticated();
  const self = useSelector(getSelf);

  useEffect(() => {
    (async () => {
      setDisplayBalance(0);
      setDisplayImage(null);
      setDisplayName(null);

      if (accountNumber === self.accountNumber) {
        setDisplayBalance(self.balance);
        setDisplayImage(self.displayImage);
        setDisplayName(self.displayName);
        return;
      }

      try {
        setRequestPending(true);
        const {data} = await axios.get<GetAccountResponse>(
          `${process.env.REACT_APP_API_URL}/api/accounts/${accountNumber}`,
        );
        setDisplayBalance(data.balance);
        setDisplayImage(data.display_image);
        setDisplayName(data.display_name);
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching the account details');
      } finally {
        setRequestPending(false);
      }
    })();
  }, [accountNumber, self]);

  const renderAccountNumber = () => {
    if (requestPending) return null;

    return (
      <>
        <S.Label>Account Number</S.Label>
        <S.CopyContainer text={accountNumber || ''} />
      </>
    );
  };

  const renderCoinAmount = () => {
    if (requestPending) return null;

    return <S.CoinAmount amount={displayBalance} />;
  };

  const renderDisplayImage = () => {
    if (requestPending) return <Loader />;

    return (
      <S.ImgWrapper>
        <S.Img alt="image" src={displayImage || DefaultAvatar} />
      </S.ImgWrapper>
    );
  };

  const renderDisplayName = () => {
    if (displayName === null) return null;

    return <S.Name>{displayName || 'Anonymous'}</S.Name>;
  };

  const renderEditProfileButton = () => {
    if (!isAuthenticated || accountNumber !== self.accountNumber) return null;

    return <Button color={ButtonColor.secondary} onClick={toggleEditAccountModal} text="Edit profile" />;
  };

  return (
    <>
      <S.Container className={className}>
        <S.Left>{renderDisplayImage()}</S.Left>
        <S.Right>
          <S.UserInformation>
            {renderDisplayName()}
            {renderCoinAmount()}
            {renderAccountNumber()}
          </S.UserInformation>
          <S.ButtonContainer>{renderEditProfileButton()}</S.ButtonContainer>
        </S.Right>
      </S.Container>
      {editAccountModalIsOpen ? <EditAccountModal close={toggleEditAccountModal} /> : null}
    </>
  );
};

export default Overview;
