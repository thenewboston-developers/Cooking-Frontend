import {useEffect, useState} from 'react';
import axios from 'axios';

import Loader from 'components/Loader';
import Recipe from 'components/Recipe';
import {RecipeReadSerializer, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import * as S from './Styles';

const Home: SFC = ({className}) => {
  const [deletedRecipeIds, setDeletedRecipeIds] = useState<number[]>([]);
  const [recipes, setRecipes] = useState<RecipeReadSerializer[] | null>(null);
  const [requestPending, setRequestPending] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        setRequestPending(true);
        const {data} = await axios.get<RecipeReadSerializer[]>(`${process.env.REACT_APP_API_URL}/api/recipes`);
        setRecipes(data);
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching recipes');
      } finally {
        setRequestPending(false);
      }
    })();
  }, []);

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
          <div>No recipes to display</div>
        </S.EmptyStateWrapper>
      );
    }

    const items = recipes
      .filter(({id}) => !deletedRecipeIds.includes(id))
      .map(({balance, creator, description, id, image_url, name}) => (
        <Recipe
          balance={balance}
          creatorAccountNumber={creator.account_number}
          creatorDisplayImage={creator.display_image}
          creatorDisplayName={creator.display_name}
          description={description}
          handleDelete={handleRecipeDelete}
          id={id}
          imageUrl={image_url}
          key={id}
          name={name}
        />
      ));

    return <S.RecipeList>{items}</S.RecipeList>;
  };

  return <S.Container className={className}>{renderRecipeList()}</S.Container>;
};

export default Home;
