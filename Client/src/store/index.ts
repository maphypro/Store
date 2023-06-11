import { configureStore } from "@reduxjs/toolkit";
import userReduces from './User/userSlice'
import courseReducer from './Course/courseSlice'
import { userApi } from "./User/userApi";
import { courseApi } from "./Course/courseApi";

const store = configureStore({
    reducer: {
        userReduces,
        courseReducer,
        [userApi.reducerPath]: userApi.reducer,
        [courseApi.reducerPath]: courseApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(userApi.middleware)
        .concat(courseApi.middleware)
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
