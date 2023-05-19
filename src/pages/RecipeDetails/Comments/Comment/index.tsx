import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {mdiDotsVertical} from '@mdi/js';

import {deleteComment} from 'api/comments';
import Avatar from 'components/Avatar';
import DropdownMenu, {DropdownMenuOption} from 'components/DropdownMenu';
import {ToastType} from 'enums';
import {useToggle} from 'hooks';
import EditCommentModal from 'modals/EditCommentModal';
import {getSelf} from 'selectors/state';
import {CommentReadSerializer, SFC} from 'types';
import {shortDate} from 'utils/dates';
import {displayErrorToast, displayToast} from 'utils/toast';
import * as S from './Styles';

export interface CommentProps {
  comment: CommentReadSerializer;
  handleDelete: (id: number) => void;
  handleEdit: (comment: CommentReadSerializer) => void;
}

const Comment: SFC<CommentProps> = ({className, comment, handleDelete, handleEdit}) => {
  const [editCommentModalIsOpen, toggleEditCommentModal] = useToggle(false);
  const self = useSelector(getSelf);

  const {
    amount,
    created_date,
    creator: {account_number, display_image, display_name},
    id,
    text,
  } = comment;

  const handleDeleteClick = async () => {
    try {
      await deleteComment(id);
      displayToast('Comment deleted!', ToastType.success);
      handleDelete(id);
    } catch (error) {
      console.error(error);
      displayErrorToast('Error deleting the comment');
    }
  };

  const renderNameDateContainer = () => {
    return (
      <S.NameDateContainer>
        <Link to={`/profile/${account_number}`}>
          <S.DisplayName>{display_name || 'Anonymous'}</S.DisplayName>
        </Link>
        <S.Dot>·</S.Dot>
        <S.Date>{shortDate(created_date, true)}</S.Date>
      </S.NameDateContainer>
    );
  };

  const renderRight = () => {
    if (account_number !== self.accountNumber) return null;

    const menuOptions: DropdownMenuOption[] = [
      {label: 'Edit', onClick: toggleEditCommentModal},
      {label: 'Delete', onClick: handleDeleteClick},
    ];

    return (
      <S.Right>
        <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />
      </S.Right>
    );
  };

  return (
    <>
      <S.Container className={className}>
        <Avatar accountNumber={account_number} displayImage={display_image} />
        <S.Middle>
          {renderNameDateContainer()}
          <S.Text>{text}</S.Text>
          <S.CoinAmount amount={amount} />
        </S.Middle>
        {renderRight()}
      </S.Container>
      {editCommentModalIsOpen ? (
        <EditCommentModal close={toggleEditCommentModal} comment={comment} handleEdit={handleEdit} />
      ) : null}
    </>
  );
};

export default Comment;
