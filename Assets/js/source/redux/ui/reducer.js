// @flow
import { List } from 'immutable';
import { SHOW_POST_EDIT_MODAL } from './actions';
import type { Posts, PostAction } from './type';

export default function uiReducer(state: state = {}, action: uiAction) {
    switch (action.type) {

        case SHOW_POST_EDIT_MODAL: {
            return '';
        }

        default: {
            return state;
        }
    }
}
