import {useSelector} from 'react-redux';
import {mdiAccount, mdiHome} from '@mdi/js';

import {useIsAuthenticated} from 'hooks';
import {getSelf} from 'selectors/state';
import {SFC} from 'types';
import NavItem from './NavItem';
import * as S from './Styles';

const LeftNav: SFC = ({className}) => {
  const isAuthenticated = useIsAuthenticated();
  const self = useSelector(getSelf);

  const renderProfileLink = () => {
    if (!isAuthenticated) return null;
    return <NavItem icon={mdiAccount} text="Profile" to={`/profile/${self.accountNumber}`} />;
  };

  return (
    <S.Container className={className}>
      <NavItem icon={mdiHome} text="Home" to="/" />
      {renderProfileLink()}
    </S.Container>
  );
};

export default LeftNav;
