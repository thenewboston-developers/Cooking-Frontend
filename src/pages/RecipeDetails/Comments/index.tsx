import {SFC} from 'types';
import * as S from './Styles';

const Comments: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <h3>comments here</h3>
    </S.Container>
  );
};

export default Comments;
