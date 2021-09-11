import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import reducers from './reducers';

const rootReducer = combineReducers(reducers);

export default configureStore({
  reducer: rootReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
