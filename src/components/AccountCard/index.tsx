import {Link} from 'react-router-dom';

import DefaultAvatar from 'assets/default-avatar.png';
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
        <S.ImgWrapper>
          <S.Img alt="avatar" src={displayImage || DefaultAvatar} />
        </S.ImgWrapper>
      </Link>
      <S.Text>
        <Link to={`/profile/${accountNumber}`}>
          <S.DisplayName>{displayName || 'Anonymous'}</S.DisplayName>
        </Link>
        <S.AccountNumber>{truncate(accountNumber, 16)}</S.AccountNumber>
      </S.Text>
    </S.Container>
  );
};

export default AccountCard;
