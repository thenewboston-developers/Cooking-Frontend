import {useSelector} from 'react-redux';

import {useToggle} from 'hooks';
import WithdrawModal from 'modals/WithdrawModal';
import {getSelf} from 'selectors/state';
import {CommentReadSerializer, RecipeReadSerializer, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import * as S from './Styles';

export interface OverviewProps {
  commentList: CommentReadSerializer[];
  recipe: RecipeReadSerializer;
  refreshRecipe: () => void;
}

const Overview: SFC<OverviewProps> = ({className, commentList, recipe, refreshRecipe}) => {
  const [withdrawModalIsOpen, toggleWithdrawModal] = useToggle(false);
  const self = useSelector(getSelf);

  const handleCoinAmountClick = () => {
    if (recipe.creator.account_number === self.accountNumber) {
      toggleWithdrawModal();
      return;
    }

    displayErrorToast('You can not withdraw other users coins');
  };

  const renderCommentListLength = () => {
    const commentsText = commentList.length === 1 ? 'comment' : 'comments';

    return (
      <S.CommentListLength>
        {commentList.length} {commentsText}
      </S.CommentListLength>
    );
  };

  return (
    <>
      <S.Container className={className}>
        {renderCommentListLength()}
        <S.CoinAmount amount={recipe.balance} onClick={handleCoinAmountClick} />
      </S.Container>
      {withdrawModalIsOpen ? (
        <WithdrawModal close={toggleWithdrawModal} recipe={recipe} refreshRecipe={refreshRecipe} />
      ) : null}
    </>
  );
};

export default Overview;
