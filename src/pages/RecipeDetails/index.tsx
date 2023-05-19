import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {mdiDotsVertical} from '@mdi/js';

import AccountCard from 'components/AccountCard';
import Detail from 'components/Detail';
import DropdownMenu, {DropdownMenuOption} from 'components/DropdownMenu';
import Loader from 'components/Loader';
import {ToastType} from 'enums';
import {getSelf} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, RecipeReadSerializer, SFC} from 'types';
import {authorizationHeaders} from 'utils/authentication';
import {shortDate} from 'utils/dates';
import {truncate} from 'utils/strings';
import {displayErrorToast, displayToast} from 'utils/toast';
import Comments from './Comments';
import * as S from './Styles';

const RecipeDetails: SFC = ({className}) => {
  const [recipe, setRecipe] = useState<RecipeReadSerializer | null>(null);
  const [requestPending, setRequestPending] = useState<boolean>(true);
  const {id: recipeId} = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const self = useSelector(getSelf);

  useEffect(() => {
    (async () => {
      try {
        setRequestPending(true);
        const {data} = await axios.get<RecipeReadSerializer>(
          `${process.env.REACT_APP_API_URL}/api/recipes/${recipeId}`,
        );
        setRecipe(data);
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching recipe');
      } finally {
        setRequestPending(false);
      }
    })();
  }, [recipeId]);

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/recipes/${recipe!.id}`, authorizationHeaders());
      displayToast('Recipe deleted!', ToastType.success);
      navigate(`/profile/${self.accountNumber}`);
    } catch (error) {
      console.error(error);
      displayErrorToast('Error deleting the recipe');
    }
  };

  const handleEditClick = () => {
    const activeRecipe = {
      balance: recipe!.balance,
      description: recipe!.description,
      id: recipe!.id,
      imageUrl: recipe!.image_url,
      name: recipe!.name,
    };

    dispatch(updateManager({activeRecipe}));
    navigate('/createEditRecipe');
  };

  const refreshRecipe = useCallback(() => {
    (async () => {
      try {
        const {data} = await axios.get<RecipeReadSerializer>(
          `${process.env.REACT_APP_API_URL}/api/recipes/${recipeId}`,
        );
        setRecipe(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [recipeId]);

  const renderDescription = () => {
    return (
      <>
        <S.SectionLabel>Description</S.SectionLabel>
        <S.SectionContent>{recipe!.description}</S.SectionContent>
      </>
    );
  };

  const renderTopLeft = () => {
    return (
      <S.TopLeft>
        <S.Name>{recipe!.name}</S.Name>
        <S.Details>
          <AccountCard
            accountNumber={recipe!.creator.account_number}
            bottomText={truncate(recipe!.creator.account_number, 16)}
            displayImage={recipe!.creator.display_image}
            displayName={recipe!.creator.display_name}
          />
          <Detail label="Created" value={shortDate(recipe!.created_date, true)} />
          <Detail label="Modified" value={shortDate(recipe!.modified_date, true)} />
        </S.Details>
      </S.TopLeft>
    );
  };

  const renderTopRight = () => {
    if (recipe!.creator.account_number !== self.accountNumber) return null;

    const menuOptions: DropdownMenuOption[] = [
      {label: 'Edit', onClick: handleEditClick},
      {label: 'Delete', onClick: handleDeleteClick},
    ];

    return (
      <S.TopRight>
        <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />
      </S.TopRight>
    );
  };

  const renderTop = () => {
    return (
      <S.Top>
        {renderTopLeft()}
        {renderTopRight()}
      </S.Top>
    );
  };

  if (requestPending) {
    return (
      <S.EmptyStateWrapper>
        <Loader />
      </S.EmptyStateWrapper>
    );
  }

  if (!recipe) {
    return (
      <S.EmptyStateWrapper>
        <div>No recipe to display</div>
      </S.EmptyStateWrapper>
    );
  }

  return (
    <S.Container className={className}>
      {renderTop()}
      <S.Img alt="image" src={recipe.image_url} />
      {renderDescription()}
      <Comments recipe={recipe} refreshRecipe={refreshRecipe} />
    </S.Container>
  );
};

export default RecipeDetails;
