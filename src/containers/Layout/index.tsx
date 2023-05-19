import LeftNav from 'containers/LeftNav';
import MainArea from 'containers/MainArea';
import {SFC} from 'types';
import * as S from './Styles';

const NewLayout: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <LeftNav />
      <MainArea />
    </S.Container>
  );
};

export default NewLayout;
