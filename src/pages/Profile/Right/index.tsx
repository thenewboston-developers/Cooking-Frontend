import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import Loader from 'components/Loader';
import Recipe from 'components/Recipe';
import {SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import * as S from './Styles';

interface TRecipe {
  creator: {
    account_number: string;
    balance: number;
    display_image: string;
    display_name: string;
  };
  description: string;
  id: number;
  image_url: string;
  name: string;
}

const Right: SFC = ({className}) => {
  const [recipes, setRecipes] = useState<TRecipe[] | null>(null);
  const [requestPending, setRequestPending] = useState<boolean>(true);
  const {accountNumber} = useParams();

  useEffect(() => {
    (async () => {
      try {
        setRequestPending(true);
        const {data} = await axios.get<TRecipe[]>(
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

  const renderRecipeList = () => {
    if (requestPending) return <Loader />;
    if (recipes === null || recipes.length === 0) return <div>No recipes to display</div>;

    const items = recipes.map(({creator, description, id, image_url, name}) => (
      <Recipe
        creatorAccountNumber={creator.account_number}
        creatorDisplayImage={creator.display_image}
        creatorDisplayName={creator.display_name}
        description={description}
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

export default Right;
