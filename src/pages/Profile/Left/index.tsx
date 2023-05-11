import {SFC} from 'types';
import * as S from './Styles';

const Left: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Img alt="image" src="https://avatars.githubusercontent.com/u/8547538?v=4" />
      <S.Name>Bucky Roberts</S.Name>
    </S.Container>
  );
};

export default Left;
