import Recipes from 'containers/Recipes';
import {SFC} from 'types';
import * as S from './Styles';

const Feed: SFC = ({className}) => {
  const endpoint = `${process.env.REACT_APP_API_URL}/api/recipes`;

  return (
    <S.Container className={className}>
      <Recipes endpoint={endpoint} />
    </S.Container>
  );
};

export default Feed;
