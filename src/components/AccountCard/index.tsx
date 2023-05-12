import {Link} from 'react-router-dom';

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
      <Link to={`/profile/${accountNumber}`}>
        <S.Img alt="avatar" src={displayImage} />
      </Link>
      <S.Text>
        <Link to={`/profile/${accountNumber}`}>
          <S.DisplayName>{displayName}</S.DisplayName>
        </Link>
        <S.AccountNumber>{truncate(accountNumber, 16)}</S.AccountNumber>
      </S.Text>
    </S.Container>
  );
};

export default AccountCard;
