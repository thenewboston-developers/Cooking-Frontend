import axios from 'axios';

import {ToastType} from 'enums';
import {RecipeReadSerializer, SFC} from 'types';
import {authorizationHeaders} from 'utils/authentication';
import {displayErrorToast, displayToast} from 'utils/toast';
import * as S from './Styles';

export interface WithdrawModalProps {
  close(): void;
  recipe: RecipeReadSerializer;
  refreshRecipe: () => void;
}

const WithdrawModal: SFC<WithdrawModalProps> = ({className, close, recipe, refreshRecipe}) => {
  const getButtonText = () => {
    return recipe.balance === 0 ? 'Close' : 'Yes, withdraw';
  };

  const handleButtonClick = async () => {
    if (recipe.balance === 0) {
      close();
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/withdraw`, {recipe_id: recipe.id}, authorizationHeaders());
      displayToast('Withdraw successful!', ToastType.success);
      refreshRecipe();
      close();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error withdrawing coins');
    }
  };

  const renderText = () => {
    if (recipe.balance === 0) return <S.Text>No coins to withdraw</S.Text>;

    const coinsText = recipe.balance === 1 ? 'coin' : 'coins';

    return (
      <S.Text>
        Withdraw <b>{recipe.balance}</b> {coinsText} to your main account?
      </S.Text>
    );
  };

  return (
    <S.Modal className={className} close={close} header="Withdraw">
      {renderText()}
      <S.Button onClick={handleButtonClick} text={getButtonText()} />
    </S.Modal>
  );
};

export default WithdrawModal;
