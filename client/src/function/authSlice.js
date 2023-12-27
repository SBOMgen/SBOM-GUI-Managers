import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        toggleAuthentication: (state) => {
            state.isAuthenticated = !state.isAuthenticated;
        },
        setTrue: (state, action) => {
            state.isAuthenticated = true;
        },
        setFalse: (state, action) => {
            state.isAuthenticated = false;
        }
    },
});
export const { toggleAuthentication, setTrue, setFalse } = authSlice.actions;
export default authSlice.reducer;
