import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

import DefaultAvatar from 'assets/default-avatar.png';
import Button, {ButtonColor} from 'components/Button';
import Loader from 'components/Loader';
import {useIsAuthenticated, useToggle} from 'hooks';
import EditAccountModal from 'modals/EditAccountModal';
import {getSelf} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, GetAccountResponse, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import * as S from './Styles';

const Left: SFC = ({className}) => {
  const [editAccountModalIsOpen, toggleEditAccountModal] = useToggle(false);
  const [displayBalance, setDisplayBalance] = useState<number>(0);
  const [displayImage, setDisplayImage] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [requestPending, setRequestPending] = useState<boolean>(false);
  const {accountNumber} = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
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

  const handleCreateRecipeClick = () => {
    dispatch(updateManager({activeRecipe: null}));
    navigate('/createEditRecipe');
  };

  const renderActionButtons = () => {
    if (!isAuthenticated || accountNumber !== self.accountNumber) return null;

    return (
      <S.ButtonContainer>
        <Button color={ButtonColor.secondary} onClick={toggleEditAccountModal} text="Edit profile" />
        <Button color={ButtonColor.secondary} onClick={handleCreateRecipeClick} text="Create recipe" />
      </S.ButtonContainer>
    );
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

  return (
    <>
      <S.Container className={className}>
        {renderDisplayImage()}
        {renderDisplayName()}
        <S.CoinAmount amount={displayBalance} />
        {renderActionButtons()}
      </S.Container>
      {editAccountModalIsOpen ? <EditAccountModal close={toggleEditAccountModal} /> : null}
    </>
  );
};

export default Left;
