import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {mdiDotsVertical} from '@mdi/js';

import Button from 'components/Button';
import CoinAmount from 'components/CoinAmount';
import {DropdownMenuOption} from 'components/DropdownMenu';
import {logout} from 'dispatchers/authentication';
import {useIsAuthenticated, useSelfDisplayImage, useToggle} from 'hooks';
import CreateAccountModal from 'modals/CreateAccountModal';
import LogInModal from 'modals/LogInModal';
import {getSelf} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import * as S from './Styles';

const Right: SFC = ({className}) => {
  const [createAccountModalIsOpen, toggleCreateAccountModal] = useToggle(false);
  const [logInModalIsOpen, toggleLogInModal] = useToggle(false);
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useIsAuthenticated();
  const self = useSelector(getSelf);
  const selfDisplayImage = useSelfDisplayImage();

  const renderContent = () => {
    if (!isAuthenticated) {
      return (
        <S.ButtonContainer>
          <Button onClick={toggleCreateAccountModal} text="Create account" />
          <Button onClick={toggleLogInModal} text="Log in" />
        </S.ButtonContainer>
      );
    }

    return (
      <>
        <CoinAmount amount={self.balance} />
        <Link to={`/profile/${self.accountNumber}`}>
          <S.Avatar alt="avatar" src={selfDisplayImage} />
        </Link>
        {renderDropdownMenu()}
      </>
    );
  };

  const renderDropdownMenu = () => {
    const menuOptions: DropdownMenuOption[] = [{label: 'Log out', onClick: () => dispatch(logout())}];
    return <S.DropdownMenu icon={mdiDotsVertical} options={menuOptions} />;
  };

  return (
    <>
      <S.Container className={className}>{renderContent()}</S.Container>
      {createAccountModalIsOpen ? <CreateAccountModal close={toggleCreateAccountModal} /> : null}
      {logInModalIsOpen ? <LogInModal close={toggleLogInModal} /> : null}
    </>
  );
};

export default Right;
