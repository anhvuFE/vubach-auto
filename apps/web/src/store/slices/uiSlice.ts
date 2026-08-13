import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  mobileMenuOpen: boolean;
  filterDrawerOpen: boolean;
  isAdminAuthenticated: boolean;
}

const initialState: UiState = {
  mobileMenuOpen: false,
  filterDrawerOpen: false,
  isAdminAuthenticated: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMobileMenu(state, action: PayloadAction<boolean>) {
      state.mobileMenuOpen = action.payload;
    },
    setFilterDrawer(state, action: PayloadAction<boolean>) {
      state.filterDrawerOpen = action.payload;
    },
    setAdminAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAdminAuthenticated = action.payload;
    },
  },
});

export const { setMobileMenu, setFilterDrawer, setAdminAuthenticated } = uiSlice.actions;
export default uiSlice.reducer;
