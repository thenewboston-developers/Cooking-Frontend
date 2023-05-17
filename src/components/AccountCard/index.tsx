import {Link} from 'react-router-dom';

import Avatar from 'components/Avatar';
import {SFC} from 'types';
import * as S from './Styles';

export interface AccountCardProps {
  accountNumber: string;
  bottomText: string;
  displayImage: string;
  displayName: string;
}

const AccountCard: SFC<AccountCardProps> = ({accountNumber, bottomText, className, displayImage, displayName}) => {
  return (
    <S.Container className={className}>
      <Avatar accountNumber={accountNumber} displayImage={displayImage} />
      <S.Right>
        <Link to={`/profile/${accountNumber}`}>
          <S.DisplayName>{displayName || 'Anonymous'}</S.DisplayName>
        </Link>
        <S.BottomText>{bottomText}</S.BottomText>
      </S.Right>
    </S.Container>
  );
};

export default AccountCard;
