import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ingredientsSilceReducer from '../slices/ingredientsSilce';
import basketReducer from '../slices/basketSlice';
import userReducer from '../slices/userSlice';
import feedReducer from '../slices/feedSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsSilceReducer,
  basket: basketReducer,
  user: userReducer,
  feeds: feedReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
