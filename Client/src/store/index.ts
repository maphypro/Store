import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReduces from './userSlice'
import { userApi } from "./userApi";

const store = configureStore({
    reducer: {
        userReduces,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(userApi.middleware)
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
