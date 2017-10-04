// @flow
import { List } from 'immutable';
import { ADD_POST, REMOVE_POST } from './actions';
import type { Posts, PostAction } from './type';

export default function postsReducer(state: Posts = List(), action: PostAction) {
    switch (action.type) {

        case ADD_POST: {
            return '';
        }

        case REMOVE_POST: {
            return '';
        }

        default: {
            return state;
        }
    }
}
