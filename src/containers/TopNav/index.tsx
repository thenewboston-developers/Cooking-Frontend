import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {mdiDotsVertical} from '@mdi/js';

import CookingLogo from 'assets/logos/cooking.png';
import Button from 'components/Button';
import DropdownMenu, {DropdownMenuOption} from 'components/DropdownMenu';
import {logout} from 'dispatchers/authentication';
import {useIsAuthenticated, useSelfDisplayImage, useToggle} from 'hooks';
import CreateAccountModal from 'modals/CreateAccountModal';
import LogInModal from 'modals/LogInModal';
import {getSelf} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import * as S from './Styles';

const TopNav: SFC = ({className}) => {
  const [createAccountModalIsOpen, toggleCreateAccountModal] = useToggle(false);
  const [logInModalIsOpen, toggleLogInModal] = useToggle(false);
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useIsAuthenticated();
  const self = useSelector(getSelf);
  const selfDisplayImage = useSelfDisplayImage();

  const renderDropdownMenu = () => {
    const menuOptions: DropdownMenuOption[] = [{label: 'Log out', onClick: () => dispatch(logout())}];
    return <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />;
  };

  const renderRightContent = () => {
    if (!isAuthenticated) {
      return (
        <>
          <Button onClick={toggleCreateAccountModal} text="Create account" />
          <Button onClick={toggleLogInModal} text="Log in" />
        </>
      );
    }

    return (
      <>
        <Link to={`/profile/${self.accountNumber}`}>
          <S.Avatar alt="avatar" src={selfDisplayImage} />
        </Link>
        {renderDropdownMenu()}
      </>
    );
  };

  return (
    <>
      <S.Container className={className}>
        <S.Left>
          <Link to="/">
            <S.Logo alt="logo" src={CookingLogo} />
          </Link>
        </S.Left>
        <S.Right>{renderRightContent()}</S.Right>
      </S.Container>
      {createAccountModalIsOpen ? <CreateAccountModal close={toggleCreateAccountModal} /> : null}
      {logInModalIsOpen ? <LogInModal close={toggleLogInModal} /> : null}
    </>
  );
};

export default TopNav;
