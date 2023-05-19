import axios from 'axios';

import {CommentReadSerializer} from 'types';
import {authorizationHeaders} from 'utils/authentication';

export const createComment = async (data: any) => {
  try {
    const {data: commentData} = await axios.post<CommentReadSerializer>(
      `${process.env.REACT_APP_API_URL}/api/comments`,
      data,
      authorizationHeaders(),
    );
    return commentData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteComment = async (id: number) => {
  try {
    return await axios.delete(`${process.env.REACT_APP_API_URL}/api/comments/${id}`, authorizationHeaders());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCommentsByRecipeId = async (recipeId: number) => {
  try {
    const {data} = await axios.get<CommentReadSerializer[]>(
      `${process.env.REACT_APP_API_URL}/api/comments?recipe=${recipeId}`,
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateComment = async (id: number, data: any) => {
  try {
    return await axios.patch<CommentReadSerializer>(
      `${process.env.REACT_APP_API_URL}/api/comments/${id}`,
      data,
      authorizationHeaders(),
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};
