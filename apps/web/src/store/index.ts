import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './slices/carSlice';
import filterReducer from './slices/filterSlice';
import favoriteReducer from './slices/favoriteSlice';
import uiReducer from './slices/uiSlice';

/**
 * Store factory. A fresh store is created per request on the server and once on
 * the client, which is the recommended pattern for Next.js App Router + RTK.
 */
export const makeStore = () =>
  configureStore({
    reducer: {
      cars: carsReducer,
      filter: filterReducer,
      favorite: favoriteReducer,
      ui: uiReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
