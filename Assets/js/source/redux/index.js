// @flow
import { createStore } from 'redux';
import rootReducer from './reducer';
import initialState from './initialState';

const getStore = () => createStore(rootReducer, initialState);

export default getStore;