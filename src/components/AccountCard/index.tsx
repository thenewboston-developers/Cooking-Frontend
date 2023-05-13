import {Link} from 'react-router-dom';

import Avatar from 'components/Avatar';
import {SFC} from 'types';
import {truncate} from 'utils/strings';
import * as S from './Styles';

export interface AccountCardProps {
  accountNumber: string;
  displayImage: string;
  displayName: string;
}

const AccountCard: SFC<AccountCardProps> = ({accountNumber, className, displayImage, displayName}) => {
  return (
    <S.Container className={className}>
      <Avatar accountNumber={accountNumber} displayImage={displayImage} />
      <S.Right>
        <Link to={`/profile/${accountNumber}`}>
          <S.DisplayName>{displayName || 'Anonymous'}</S.DisplayName>
        </Link>
        <S.AccountNumber>{truncate(accountNumber, 16)}</S.AccountNumber>
      </S.Right>
    </S.Container>
  );
};

export default AccountCard;
