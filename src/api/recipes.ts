import axios from 'axios';

import {RecipeReadSerializer} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/recipes`;

export const createRecipe = async (data: any): Promise<RecipeReadSerializer> => {
  try {
    const response = await axios.post<RecipeReadSerializer>(BASE_URL, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteRecipe = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, authorizationHeaders());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRecipe = async (id: number): Promise<RecipeReadSerializer> => {
  try {
    const response = await axios.get<RecipeReadSerializer>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateRecipe = async (id: number, data: any): Promise<RecipeReadSerializer> => {
  try {
    const response = await axios.patch<RecipeReadSerializer>(`${BASE_URL}/${id}`, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
