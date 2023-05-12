import {RootState} from 'types';

export const getManager = (state: RootState) => state.manager;
export const getSelf = (state: RootState) => state.self;
