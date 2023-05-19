import {useDispatch, useSelector} from 'react-redux';
import {mdiAccount, mdiDotsVertical, mdiHome} from '@mdi/js';

import Button from 'components/Button';
import CoinAmount from 'components/CoinAmount';
import {DropdownMenuOption} from 'components/DropdownMenu';
import {logout} from 'dispatchers/authentication';
import {useIsAuthenticated, useToggle} from 'hooks';
import CreateAccountModal from 'modals/CreateAccountModal';
import LogInModal from 'modals/LogInModal';
import {getSelf} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import NavItem from './NavItem';
import * as S from './Styles';

const LeftNav: SFC = ({className}) => {
  const [createAccountModalIsOpen, toggleCreateAccountModal] = useToggle(false);
  const [logInModalIsOpen, toggleLogInModal] = useToggle(false);
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useIsAuthenticated();
  const self = useSelector(getSelf);

  const renderBalance = () => {
    if (!isAuthenticated) return null;
    return <CoinAmount amount={self.balance} />;
  };

  const renderLogoutButton = () => {
    if (!isAuthenticated) return null;
    const menuOptions: DropdownMenuOption[] = [{label: 'Log out', onClick: () => dispatch(logout())}];
    return <S.DropdownMenu icon={mdiDotsVertical} options={menuOptions} />;
  };

  const renderProfileLink = () => {
    if (!isAuthenticated) return null;
    return <NavItem icon={mdiAccount} text="Profile" to={`/profile/${self.accountNumber}`} />;
  };

  const renderUnauthenticatedButtons = () => {
    if (isAuthenticated) return null;

    return (
      <S.ButtonContainer>
        <Button onClick={toggleCreateAccountModal} text="Create account" />
        <Button onClick={toggleLogInModal} text="Log in" />
      </S.ButtonContainer>
    );
  };

  return (
    <>
      <S.Container className={className}>
        <S.Top>
          {renderUnauthenticatedButtons()}
          {renderBalance()}
          <NavItem icon={mdiHome} text="Home" to="/" />
          {renderProfileLink()}
        </S.Top>
        <S.Bottom>{renderLogoutButton()}</S.Bottom>
      </S.Container>
      {createAccountModalIsOpen ? <CreateAccountModal close={toggleCreateAccountModal} /> : null}
      {logInModalIsOpen ? <LogInModal close={toggleLogInModal} /> : null}
    </>
  );
};

export default LeftNav;
