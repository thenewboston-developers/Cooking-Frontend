import Center from 'containers/Center';
import LeftNav from 'containers/LeftNav';
import Right from 'containers/Right';
import {SFC} from 'types';
import * as S from './Styles';

const NewLayout: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <LeftNav />
      <Center />
      <Right />
    </S.Container>
  );
};

export default NewLayout;
