import type { List, Map } from 'immutable';
import { SHOW_POST_EDIT_MODAL } from './actions';

// actions
export type showPostEditAction = {
  type: SHOW_POST_EDIT_MODAL,
  payload: {
    id: number
  }
};

export type uiAction = | showPostEditAction;
