import {useSelector} from 'react-redux';

import {getManager} from 'selectors/state';
import {Recipe} from 'types';

const useActiveRecipe = (): Recipe | null => {
  const manager = useSelector(getManager);

  return manager.activeRecipe || null;
};

export default useActiveRecipe;
