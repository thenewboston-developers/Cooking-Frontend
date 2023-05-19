import {SFC} from 'types';
import Overview from './Overview';
import Recipes from './Recipes';
import * as S from './Styles';

const Profile: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Overview />
      <Recipes />
    </S.Container>
  );
};

export default Profile;
