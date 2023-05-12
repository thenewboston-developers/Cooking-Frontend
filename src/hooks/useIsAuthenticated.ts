import {useSelector} from 'react-redux';

import {getSelf} from 'selectors/state';

const useIsAuthenticated = (): boolean => {
  const self = useSelector(getSelf);

  return !!self.accountNumber;
};

export default useIsAuthenticated;
