import { configureStore } from "@reduxjs/toolkit";
import countSlice from "./countSlice";
import authReducer from "./authSlice";

const store = configureStore({
    reducer: {
        countSlice,
        auth: authReducer
    }
})

export default store