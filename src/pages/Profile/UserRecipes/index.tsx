import {useParams} from 'react-router-dom';

import Recipes from 'containers/Recipes';
import {SFC} from 'types';
import * as S from './Styles';

const UserRecipes: SFC = ({className}) => {
  const {accountNumber} = useParams();

  const endpoint = `${process.env.REACT_APP_API_URL}/api/recipes?creator=${accountNumber}`;

  return (
    <S.Container className={className}>
      <Recipes endpoint={endpoint} />
    </S.Container>
  );
};

export default UserRecipes;
