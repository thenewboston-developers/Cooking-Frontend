import Recipes from 'containers/Recipes';
import {SFC} from 'types';

const Feed: SFC = ({className}) => {
  const endpoint = `${process.env.REACT_APP_API_URL}/api/recipes`;

  return <Recipes className={className} endpoint={endpoint} />;
};

export default Feed;
