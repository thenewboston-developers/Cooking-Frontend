import {useDispatch, useSelector} from 'react-redux';
import {mdiAccount, mdiAccountPlus, mdiExitToApp, mdiHome, mdiLogin} from '@mdi/js';

import {logout} from 'dispatchers/authentication';
import {useIsAuthenticated, useToggle} from 'hooks';
import CreateAccountModal from 'modals/CreateAccountModal';
import LogInModal from 'modals/LogInModal';
import {getSelf} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import Balance from './Balance';
import CreateRecipeButton from './CreateRecipeButton';
import MenuButton from './MenuItem/MenuButton';
import MenuLink from './MenuItem/MenuLink';
import * as S from './Styles';

const LeftNav: SFC = ({className}) => {
  const [createAccountModalIsOpen, toggleCreateAccountModal] = useToggle(false);
  const [logInModalIsOpen, toggleLogInModal] = useToggle(false);
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useIsAuthenticated();
  const self = useSelector(getSelf);

  const renderBalance = () => {
    if (!isAuthenticated) return null;
    return <Balance />;
  };

  const renderCreateRecipeButton = () => {
    if (!isAuthenticated) return null;
    return <CreateRecipeButton />;
  };

  const renderLogoutButton = () => {
    if (!isAuthenticated) return null;
    return <MenuButton icon={mdiExitToApp} onClick={() => dispatch(logout())} text="Log out" />;
  };

  const renderProfileLink = () => {
    if (!isAuthenticated) return null;
    return <MenuLink icon={mdiAccount} text="Profile" to={`/profile/${self.accountNumber}`} />;
  };

  const renderUnauthenticatedButtons = () => {
    if (isAuthenticated) return null;

    return (
      <>
        <MenuButton icon={mdiAccountPlus} onClick={toggleCreateAccountModal} text="Create account" />
        <MenuButton icon={mdiLogin} onClick={toggleLogInModal} text="Log in" />
      </>
    );
  };

  return (
    <>
      <S.Container className={className}>
        <S.Top>
          {renderBalance()}
          {renderUnauthenticatedButtons()}
          <MenuLink icon={mdiHome} text="Home" to="/" />
          {renderProfileLink()}
          {renderCreateRecipeButton()}
        </S.Top>
        <S.Bottom>{renderLogoutButton()}</S.Bottom>
      </S.Container>
      {createAccountModalIsOpen ? <CreateAccountModal close={toggleCreateAccountModal} /> : null}
      {logInModalIsOpen ? <LogInModal close={toggleLogInModal} /> : null}
    </>
  );
};

export default LeftNav;
