import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api";
import authReducer from "../slices/authSlice";
const store = configureStore({
    reducer: {
        [api.reducerPath] : api.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export  {store}