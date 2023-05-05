import CookingLogo from 'assets/logos/Cooking.png';
import Button from 'components/Button';
import {SFC} from 'types/generic';
import * as S from './Styles';

const TopNav: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Left>
        <S.Logo alt="logo" src={CookingLogo}/>
      </S.Left>
      <S.Right>
        <Button text="Create Account" />
        <Button text="Log In" />
      </S.Right>
    </S.Container>
  );
};

export default TopNav;
