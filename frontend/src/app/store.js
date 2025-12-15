import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../fetures/authentication/authSlice.js"

export const store = configureStore({
    reducer:{
        auth: authReducer
    }
})