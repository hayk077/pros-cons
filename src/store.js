import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import messageReducer from './reducers/messageReducer';

export default createStore(
  combineReducers({
    messageReducer
  }),
  {},
  applyMiddleware(logger)
);
