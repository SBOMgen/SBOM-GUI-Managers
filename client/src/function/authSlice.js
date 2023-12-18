import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleAuthentication: (state) => {
      state.isAuthenticated = !state.isAuthenticated;
    },
    addUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    deleteUser: (state) => {
      state.user = {};
    },
  },
});

export const { toggleAuthentication, addUser, deleteUser } = authSlice.actions;
export default authSlice.reducer;
