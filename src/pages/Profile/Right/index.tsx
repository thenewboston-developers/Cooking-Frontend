import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import Loader from 'components/Loader';
import Recipe from 'components/Recipe';
import {RecipeReadSerializer, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import * as S from './Styles';

const Right: SFC = ({className}) => {
  const [deletedRecipeIds, setDeletedRecipeIds] = useState<number[]>([]);
  const [recipes, setRecipes] = useState<RecipeReadSerializer[] | null>(null);
  const [requestPending, setRequestPending] = useState<boolean>(true);
  const {accountNumber} = useParams();

  useEffect(() => {
    (async () => {
      try {
        setRequestPending(true);
        const {data} = await axios.get<RecipeReadSerializer[]>(
          `${process.env.REACT_APP_API_URL}/api/recipes?creator=${accountNumber}`,
        );
        setRecipes(data);
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching recipes');
      } finally {
        setRequestPending(false);
      }
    })();
  }, [accountNumber]);

  const handleRecipeDelete = (id: number) => {
    setDeletedRecipeIds([...deletedRecipeIds, id]);
  };

  const renderRecipeList = () => {
    if (requestPending) return <Loader />;
    if (recipes === null || recipes.length === 0) return <div>No recipes to display</div>;

    const items = recipes
      .filter(({id}) => !deletedRecipeIds.includes(id))
      .map((recipe) => <Recipe handleDelete={handleRecipeDelete} key={recipe.id} recipe={recipe} />);

    return <S.RecipeList>{items}</S.RecipeList>;
  };

  return <S.Container className={className}>{renderRecipeList()}</S.Container>;
};

export default Right;
