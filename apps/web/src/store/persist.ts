import type { AppStore } from './index';
import { setCars } from './slices/carSlice';
import { setFavorites } from './slices/favoriteSlice';
import { setAdminAuthenticated } from './slices/uiSlice';
import type { Car } from '@/types/car';

const KEYS = {
  cars: 'vba:cars',
  favorites: 'vba:favorites',
  admin: 'vba:admin-auth',
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

  const admin = readJSON<boolean>(KEYS.admin);
  if (admin) store.dispatch(setAdminAuthenticated(true));
};

/** Subscribe to persist relevant slices; returns an unsubscribe fn. */
export const persistStore = (store: AppStore): (() => void) => {
  let prev = {
    cars: store.getState().cars.items,
    favorites: store.getState().favorite.ids,
    admin: store.getState().ui.isAdminAuthenticated,
  };

  return store.subscribe(() => {
    const state = store.getState();
    if (state.favorite.ids !== prev.favorites) {
      window.localStorage.setItem(KEYS.favorites, JSON.stringify(state.favorite.ids));
    }
    if (state.cars.items !== prev.cars) {
      window.localStorage.setItem(KEYS.cars, JSON.stringify(state.cars.items));
    }
    if (state.ui.isAdminAuthenticated !== prev.admin) {
      window.localStorage.setItem(KEYS.admin, JSON.stringify(state.ui.isAdminAuthenticated));
    }
    prev = {
      cars: state.cars.items,
      favorites: state.favorite.ids,
      admin: state.ui.isAdminAuthenticated,
    };
  });
};

export const PERSIST_KEYS = KEYS;
