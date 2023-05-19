import {SFC} from 'types';
import Overview from './Overview';
import UserRecipes from './UserRecipes';
import * as S from './Styles';

const Profile: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Overview />
      <UserRecipes />
    </S.Container>
  );
};

export default Profile;
