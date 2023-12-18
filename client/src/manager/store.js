import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../function/authSlice";
export const store=configureStore({
    reducer: authSlice
})