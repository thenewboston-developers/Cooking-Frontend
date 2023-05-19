import axios from 'axios';

import {CommentReadSerializer} from 'types';
import {authorizationHeaders} from 'utils/authentication';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/comments`;

export const createComment = async (data: any): Promise<CommentReadSerializer> => {
  try {
    const response = await axios.post<CommentReadSerializer>(BASE_URL, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteComment = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, authorizationHeaders());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCommentsByRecipeId = async (recipeId: number): Promise<CommentReadSerializer[]> => {
  try {
    const response = await axios.get<CommentReadSerializer[]>(`${BASE_URL}?recipe=${recipeId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateComment = async (id: number, data: any): Promise<CommentReadSerializer> => {
  try {
    const response = await axios.patch<CommentReadSerializer>(`${BASE_URL}/${id}`, data, authorizationHeaders());
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
