import Recipe from 'components/Recipe';
import {Recipe as TRecipe, SFC} from 'types';
import * as S from './Styles';

const recipes: TRecipe[] = [
  {
    description: 'A classic lasagna recipe with layers of pasta, meat sauce, and ricotta cheese',
    id: '5',
    imageUrl: 'https://images.pexels.com/photos/14696208/pexels-photo-14696208.jpeg?auto=compress&cs=tinysrgb&w=1600',
    name: 'Meat Lasagna',
  },
  {
    description: 'A delicious and healthy quinoa salad with roasted vegetables and feta cheese',
    id: '6',
    imageUrl: 'https://images.pexels.com/photos/5865161/pexels-photo-5865161.jpeg?auto=compress&cs=tinysrgb&w=1600',
    name: 'Roasted Vegetable Quinoa Salad',
  },
  {
    description: 'A flavorful Indian curry with tender chunks of chicken in a creamy tomato sauce',
    id: '7',
    imageUrl: 'https://images.pexels.com/photos/2611917/pexels-photo-2611917.jpeg?auto=compress&cs=tinysrgb&w=1600',
    name: 'Chicken Tikka Masala',
  },
  {
    description: 'A sweet and tangy glazed salmon recipe with honey and soy sauce',
    id: '8',
    imageUrl: 'https://images.pexels.com/photos/842142/pexels-photo-842142.jpeg?auto=compress&cs=tinysrgb&w=1600',
    name: 'Honey Soy Glazed Salmon',
  },
];

const Home: SFC = ({className}) => {
  const renderRecipeList = () => {
    const items = recipes.map(({id, description, imageUrl, name}) => (
      <Recipe description={description} imageUrl={imageUrl} key={id} name={name} />
    ));

    return <S.RecipeList>{items}</S.RecipeList>;
  };

  return <S.Container className={className}>{renderRecipeList()}</S.Container>;
};

export default Home;
