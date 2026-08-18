import type { AppStore } from './index';
import { bootstrapAuth } from './slices/authSlice';
import { setCars } from './slices/carSlice';
import { setFavorites } from './slices/favoriteSlice';
import type { Car } from '@/types/car';

const KEYS = {
  cars: 'vba:cars',
  favorites: 'vba:favorites',
} as const;

const readJSON = <T>(key: string): T | null => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

/** Hydrate the store from localStorage (client-only, called after mount). */
export const hydrateStore = (store: AppStore): void => {
  const favorites = readJSON<string[]>(KEYS.favorites);
  if (favorites) store.dispatch(setFavorites(favorites));

  const cars = readJSON<Car[]>(KEYS.cars);
  if (cars && Array.isArray(cars) && cars.length > 0) store.dispatch(setCars(cars));

  // Auth session is not stored in localStorage directly: the refresh token
  // (held by tokenStore) drives a bootstrap that reloads the user from the API.
  store.dispatch(bootstrapAuth());
};

/** Subscribe to persist relevant slices; returns an unsubscribe fn. */
export const persistStore = (store: AppStore): (() => void) => {
  let prev = {
    cars: store.getState().cars.items,
    favorites: store.getState().favorite.ids,
  };

  return store.subscribe(() => {
    const state = store.getState();
    if (state.favorite.ids !== prev.favorites) {
      window.localStorage.setItem(KEYS.favorites, JSON.stringify(state.favorite.ids));
    }
    if (state.cars.items !== prev.cars) {
      window.localStorage.setItem(KEYS.cars, JSON.stringify(state.cars.items));
    }
    prev = {
      cars: state.cars.items,
      favorites: state.favorite.ids,
    };
  });
};

export const PERSIST_KEYS = KEYS;
