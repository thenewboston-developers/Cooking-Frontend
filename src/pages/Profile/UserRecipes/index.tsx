import {useParams} from 'react-router-dom';

import Recipes from 'containers/Recipes';
import {SFC} from 'types';

const UserRecipes: SFC = ({className}) => {
  const {accountNumber} = useParams();

  const endpoint = `${process.env.REACT_APP_API_URL}/api/recipes?creator=${accountNumber}`;

  return <Recipes className={className} endpoint={endpoint} />;
};

export default UserRecipes;
