import {useEffect, useState} from 'react';
import axios from 'axios';

import Loader from 'components/Loader';
import Recipe from 'components/Recipe';
import {RecipeReadSerializer, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import * as S from './Styles';

interface RecipesProps {
  endpoint: string;
}

const Recipes: SFC<RecipesProps> = ({className, endpoint}) => {
  const [deletedRecipeIds, setDeletedRecipeIds] = useState<number[]>([]);
  const [recipes, setRecipes] = useState<RecipeReadSerializer[] | null>(null);
  const [requestPending, setRequestPending] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        setRequestPending(true);
        const {data} = await axios.get<RecipeReadSerializer[]>(endpoint);
        setRecipes(data);
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching recipes');
      } finally {
        setRequestPending(false);
      }
    })();
  }, [endpoint]);

  const handleRecipeDelete = (id: number) => {
    setDeletedRecipeIds([...deletedRecipeIds, id]);
  };

  const renderRecipeList = () => {
    if (requestPending) {
      return (
        <S.EmptyStateWrapper>
          <Loader />
        </S.EmptyStateWrapper>
      );
    }

    if (recipes === null || recipes.length === 0) {
      return (
        <S.EmptyStateWrapper>
          <S.EmptyState>No recipes to display</S.EmptyState>
        </S.EmptyStateWrapper>
      );
    }

    const items = recipes
      .filter(({id}) => !deletedRecipeIds.includes(id))
      .map((recipe) => <Recipe handleDelete={handleRecipeDelete} key={recipe.id} recipe={recipe} />);

    return <S.RecipeList>{items}</S.RecipeList>;
  };

  return <S.Container className={className}>{renderRecipeList()}</S.Container>;
};

export default Recipes;
