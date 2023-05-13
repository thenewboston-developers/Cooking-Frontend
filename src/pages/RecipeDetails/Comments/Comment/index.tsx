import {Link} from 'react-router-dom';

import Avatar from 'components/Avatar';
import {CommentReadSerializer, SFC} from 'types';
import * as S from './Styles';

export interface CommentProps {
  comment: CommentReadSerializer;
}

const Comment: SFC<CommentProps> = ({className, comment}) => {
  const {
    creator: {account_number, display_image, display_name},
    text,
  } = comment;

  return (
    <S.Container className={className}>
      <Avatar accountNumber={account_number} displayImage={display_image} />
      <S.Right>
        <Link to={`/profile/${account_number}`}>
          <S.DisplayName>{display_name || 'Anonymous'}</S.DisplayName>
        </Link>
        <S.Text>{text}</S.Text>
      </S.Right>
    </S.Container>
  );
};

export default Comment;
