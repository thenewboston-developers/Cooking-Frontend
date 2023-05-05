import CookingLogo from 'assets/logos/Cooking.png';
import Button from 'components/Button';
import {useToggle} from 'hooks';
import LogInModal from 'modals/LogInModal';
import {SFC} from 'types/generic';
import * as S from './Styles';

const TopNav: SFC = ({className}) => {
  const [logInModalIsOpen, toggleLogInModal] = useToggle(false);

  return (
    <>
      <S.Container className={className}>
        <S.Left>
          <S.Logo alt="logo" src={CookingLogo}/>
        </S.Left>
        <S.Right>
          <Button text="Create Account" />
          <Button onClick={toggleLogInModal} text="Log In" />
        </S.Right>
      </S.Container>
      {logInModalIsOpen ? <LogInModal close={toggleLogInModal} /> : null}
    </>
  );
};

export default TopNav;
