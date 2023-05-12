import {SFC} from 'types';
import * as S from './Styles';

const Profile: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Left />
      <S.Right />
    </S.Container>
  );
};

export default Profile;
