import { configureStore } from "@reduxjs/toolkit";
import userReduces from './User/userSlice'
import courseCardReducer from './Course/courseCardSlice'
import courseCreateReducer from './Course/courseCreateSlice'
import { userApi } from "./User/userApi";
import { courseApi } from "./Course/courseApi";

const store = configureStore({
    reducer: {
        userReduces,
        courseCardReducer,
        courseCreateReducer,
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
