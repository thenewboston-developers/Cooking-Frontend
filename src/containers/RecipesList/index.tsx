import {SFC} from 'types/generic';
import {Recipe} from 'types/recipes';
import * as S from './Styles';

const recipes: Recipe[] = [{
  "description": "A classic spaghetti with meatballs recipe",
  "id": "1",
  "imageUrl": "https://images.pexels.com/photos/12720645/pexels-photo-12720645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "name": "Spaghetti and Meatballs"
}, {
  "description": "A quick and easy chicken stir-fry recipe",
  "id": "2",
  "imageUrl": "https://images.pexels.com/photos/236887/pexels-photo-236887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "name": "Chicken Stir-Fry"
}, {
  "description": "A hearty beef stew recipe perfect for cold nights",
  "id": "3",
  "imageUrl": "https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "name": "Beef Stew"
}, {
  "description": "A refreshing salad recipe with mixed greens and strawberries",
  "id": "4",
  "imageUrl": "https://images.pexels.com/photos/1684376/pexels-photo-1684376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "name": "Strawberry Salad"
}]

const RecipesList: SFC = ({className}) => {
  const renderRecipes = () => {
    return recipes.map(({id, imageUrl, name}) => (
      <S.Recipe key={id}>
        <S.Img alt="image" src={imageUrl}/>
        <S.Name>{name}</S.Name>
      </S.Recipe>
    ));
  };

  return (
    <S.Container className={className}>
      {renderRecipes()}
    </S.Container>
  );
};

export default RecipesList;
