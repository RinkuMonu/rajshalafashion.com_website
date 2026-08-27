// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authModalOpen: false,
  authMode: 'login', // 'login' or 'register'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openAuthModal: (state, action) => {
      state.authModalOpen = true;
      state.authMode = action.payload || 'login';
    },
    closeAuthModal: (state) => {
      state.authModalOpen = false;
    },
    setAuthMode: (state, action) => {
      state.authMode = action.payload;
    },
  },
});

export const { openAuthModal, closeAuthModal, setAuthMode } = authSlice.actions;
export default authSlice.reducer;