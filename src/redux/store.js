import {createStore, applyMiddleware} from 'redux';

import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];
console.log('middlewares', middlewares);

const store = createStore(rootReducer, applyMiddleware(...middlewares));
console.log('store', store);

export default store;