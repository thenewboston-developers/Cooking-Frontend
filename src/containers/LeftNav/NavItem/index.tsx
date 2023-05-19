import {useLocation} from 'react-router-dom';

import {SFC} from 'types';
import * as S from './Styles';

export interface NavItemProps {
  icon: string;
  text: string;
  to: string;
}

const NavItem: SFC<NavItemProps> = ({className, icon, text, to}) => {
  const location = useLocation();

  const isActive = location.pathname === to;

  return (
    <S.Container className={className} isActive={isActive} to={to}>
      <S.Icon path={icon} size="26px" />
      <S.Text>{text}</S.Text>
    </S.Container>
  );
};

export default NavItem;
