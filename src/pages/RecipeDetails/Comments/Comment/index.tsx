import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {mdiDotsVertical} from '@mdi/js';

import Avatar from 'components/Avatar';
import DropdownMenu, {DropdownMenuOption} from 'components/DropdownMenu';
import {getSelf} from 'selectors/state';
import {CommentReadSerializer, SFC} from 'types';
import * as S from './Styles';

export interface CommentProps {
  comment: CommentReadSerializer;
}

const Comment: SFC<CommentProps> = ({className, comment}) => {
  const self = useSelector(getSelf);

  const {
    creator: {account_number, display_image, display_name},
    text,
  } = comment;

  const renderRight = () => {
    if (account_number !== self.accountNumber) return null;

    const menuOptions: DropdownMenuOption[] = [
      {label: 'Edit', onClick: () => console.log(1)},
      {label: 'Delete', onClick: () => console.log(2)},
    ];

    return (
      <S.Right>
        <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />
      </S.Right>
    );
  };

  return (
    <S.Container className={className}>
      <Avatar accountNumber={account_number} displayImage={display_image} />
      <S.Middle>
        <Link to={`/profile/${account_number}`}>
          <S.DisplayName>{display_name || 'Anonymous'}</S.DisplayName>
        </Link>
        <S.Text>{text}</S.Text>
      </S.Middle>
      {renderRight()}
    </S.Container>
  );
};

export default Comment;
