// @flow

import { combineReducers } from 'redux';
import postsReducer from './posts/reducer';
import uiReducer from './ui/reducer';

const rootReducer = combineReducers({
    posts: postsReducer,
    ui: uiReducer
});

export default rootReducer;