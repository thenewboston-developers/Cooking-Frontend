import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {mdiDotsVertical} from '@mdi/js';

import {deleteRecipe} from 'api/recipes';
import DropdownMenu, {DropdownMenuOption} from 'components/DropdownMenu';
import {ToastType} from 'enums';
import {getSelf} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, RecipeReadSerializer, SFC} from 'types';
import {shortDate} from 'utils/dates';
import {truncate} from 'utils/strings';
import {displayErrorToast, displayToast} from 'utils/toast';
import * as S from './Styles';

export interface RecipeProps {
  handleDelete: (id: number) => void;
  recipe: RecipeReadSerializer;
}

const Recipe: SFC<RecipeProps> = ({className, handleDelete, recipe}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const self = useSelector(getSelf);

  const {balance, created_date, creator, description, id, image_url, name} = recipe;

  const handleDeleteClick = async () => {
    try {
      await deleteRecipe(id);
      displayToast('Recipe deleted!', ToastType.success);
      handleDelete(id);
    } catch (error) {
      displayErrorToast('Error deleting the recipe');
    }
  };

  const handleEditClick = () => {
    const activeRecipe = {
      balance,
      description,
      id,
      imageUrl: image_url,
      name,
    };

    dispatch(updateManager({activeRecipe}));
    navigate('/createEditRecipe');
  };

  const renderRight = () => {
    if (creator.account_number !== self.accountNumber) return null;

    const menuOptions: DropdownMenuOption[] = [
      {label: 'Edit', onClick: handleEditClick},
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
      <S.ImgContainer>
        <Link to={`/recipe/${id}`}>
          <S.ImgWrapper>
            <S.Img alt="image" src={image_url} />
          </S.ImgWrapper>
        </Link>
      </S.ImgContainer>
      <S.Details>
        <Link to={`/recipe/${id}`}>
          <S.Name>{name}</S.Name>
        </Link>
        <S.Description>{truncate(description, 420)}</S.Description>
        <S.CoinAmount amount={balance} />
        <S.AccountCard
          accountNumber={creator.account_number}
          bottomText={shortDate(created_date, true)}
          displayImage={creator.display_image}
          displayName={creator.display_name}
        />
      </S.Details>
      {renderRight()}
    </S.Container>
  );
};

export default Recipe;
