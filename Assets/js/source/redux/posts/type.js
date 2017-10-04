import type { List, Map } from 'immutable';
import { ADD_POST, REMOVE_POST } from './actions';

// data
export type Posts = List<Map>;

// actions
export type AddPostAction = {
  type: ADD_POST,
  payload: {
    id: number
  }
};

export type RemovePostAction = {
  type: REMOVE_POST,
  payload: {
    id: number
  }
};

export type PostAction = | AddPostAction | RemovePostAction;
