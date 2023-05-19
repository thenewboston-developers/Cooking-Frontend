import axios from 'axios';

import {RecipeReadSerializer} from 'types';
import {authorizationHeaders} from 'utils/authentication';

export const createRecipe = async (data: any) => {
  try {
    return await axios.post<RecipeReadSerializer>(
      `${process.env.REACT_APP_API_URL}/api/recipes`,
      data,
      authorizationHeaders(),
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteRecipe = async (id: number) => {
  try {
    return await axios.delete(`${process.env.REACT_APP_API_URL}/api/recipes/${id}`, authorizationHeaders());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRecipe = async (id: number) => {
  try {
    const {data} = await axios.get<RecipeReadSerializer>(`${process.env.REACT_APP_API_URL}/api/recipes/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateRecipe = async (id: number, data: any) => {
  try {
    return await axios.patch<RecipeReadSerializer>(
      `${process.env.REACT_APP_API_URL}/api/recipes/${id}`,
      data,
      authorizationHeaders(),
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};
