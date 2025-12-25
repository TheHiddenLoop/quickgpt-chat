import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../fetures/authentication/authSlice.js"
import aiBotReducer from "../fetures/chat/chatSlice.js"

export const store = configureStore({
    reducer:{
        auth: authReducer,
        aibot:aiBotReducer
    }
})