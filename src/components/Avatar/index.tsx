import {Link} from 'react-router-dom';

import DefaultAvatar from 'assets/default-avatar.png';
import {SFC} from 'types';
import * as S from './Styles';

export interface AvatarProps {
  accountNumber: string;
  displayImage: string;
}

const Avatar: SFC<AvatarProps> = ({accountNumber, className, displayImage}) => {
  return (
    <Link to={`/profile/${accountNumber}`}>
      <S.Container className={className}>
        <S.ImgWrapper>
          <S.Img alt="avatar" src={displayImage || DefaultAvatar} />
        </S.ImgWrapper>
      </S.Container>
    </Link>
  );
};

export default Avatar;
