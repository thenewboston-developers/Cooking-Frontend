import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {mdiDotsVertical} from '@mdi/js';

import Avatar from 'components/Avatar';
import DropdownMenu, {DropdownMenuOption} from 'components/DropdownMenu';
import {ToastType} from 'enums';
import {getSelf} from 'selectors/state';
import {CommentReadSerializer, SFC} from 'types';
import {authorizationHeaders} from 'utils/authentication';
import {displayErrorToast, displayToast} from 'utils/toast';
import * as S from './Styles';

export interface CommentProps {
  comment: CommentReadSerializer;
  handleDelete: (id: number) => void;
}

const Comment: SFC<CommentProps> = ({className, comment, handleDelete}) => {
  const self = useSelector(getSelf);

  const {
    creator: {account_number, display_image, display_name},
    id,
    text,
  } = comment;

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/comments/${id}`, authorizationHeaders());
      displayToast('Comment deleted!', ToastType.success);
      handleDelete(id);
    } catch (error) {
      console.error(error);
      displayErrorToast('Error deleting the comment');
    }
  };

  const renderRight = () => {
    if (account_number !== self.accountNumber) return null;

    const menuOptions: DropdownMenuOption[] = [
      {label: 'Edit', onClick: () => console.log(1)},
      {label: 'Delete', onClick: handleDeleteClick},
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
