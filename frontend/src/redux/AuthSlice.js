import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
  };
  
  export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setUser: (state, action) => {
        state.user = action.payload; // This should set user correctly
      },
      logout: (state) => {
        state.user = null;
      },
    },
  });
  
  export const { setUser, logout } = authSlice.actions;
  export default authSlice.reducer;
  