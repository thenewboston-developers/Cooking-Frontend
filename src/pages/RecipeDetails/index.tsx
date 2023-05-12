import {SFC} from 'types';
import * as S from './Styles';

const RecipeDetails: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Card>Recipe details here</S.Card>
    </S.Container>
  );
};

export default RecipeDetails;
