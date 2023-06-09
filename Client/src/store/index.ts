import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReduces from './User/userSlice'
import courseCardReducer from './CourseCard/courseCardSlice'
import courseCreateReducer from './CourseCreate/courseCreateSlice'
import { userApi } from "./User/userApi";
import { courseCardApi } from "./CourseCard/courseCardApi";
import { courseCreateApi } from "./CourseCreate/courseCreateApi";

const store = configureStore({
    reducer: {
        userReduces,
        courseCardReducer,
        courseCreateReducer,
        [userApi.reducerPath]: userApi.reducer,
        [courseCardApi.reducerPath]: courseCardApi.reducer,
        [courseCreateApi.reducerPath]: courseCreateApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(userApi.middleware)
        .concat(courseCardApi.middleware)
        .concat(courseCreateApi.middleware)
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
