import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/** Maximum number of cars that can be compared side by side at once. */
export const MAX_COMPARE = 3;

interface CompareState {
  ids: string[];
}

const initialState: CompareState = {
  ids: [],
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    /** Add/remove a car; adds are ignored once MAX_COMPARE is reached. */
    toggleCompare(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((x) => x !== id);
      } else if (state.ids.length < MAX_COMPARE) {
        state.ids.push(id);
      }
    },
    removeFromCompare(state, action: PayloadAction<string>) {
      state.ids = state.ids.filter((x) => x !== action.payload);
    },
    setCompare(state, action: PayloadAction<string[]>) {
      state.ids = action.payload.slice(0, MAX_COMPARE);
    },
    clearCompare(state) {
      state.ids = [];
    },
  },
});

export const { toggleCompare, removeFromCompare, setCompare, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;
