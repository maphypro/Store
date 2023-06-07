import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReduces from './userSlice'
import { userApi } from "./userApi";
import { courseCardApi } from "./courseCardApi";

const store = configureStore({
    reducer: {
        userReduces,
        [userApi.reducerPath]: userApi.reducer,
        [courseCardApi.reducerPath]: courseCardApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware).concat(courseCardApi.middleware)
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
