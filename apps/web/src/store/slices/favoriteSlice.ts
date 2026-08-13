import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FavoriteState {
  ids: string[];
}

const initialState: FavoriteState = {
  ids: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((x) => x !== id);
      } else {
        state.ids.push(id);
      }
    },
    setFavorites(state, action: PayloadAction<string[]>) {
      state.ids = action.payload;
    },
    clearFavorites(state) {
      state.ids = [];
    },
  },
});

export const { toggleFavorite, setFavorites, clearFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
