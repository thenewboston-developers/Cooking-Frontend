import {Recipe} from 'types/recipes';

export interface Manager {
  activeRecipe: Recipe | null;
}
