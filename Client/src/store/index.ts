import { configureStore } from "@reduxjs/toolkit";
import userReduces from './userSlice'

const store =  configureStore({
    reducer: {
        userReduces
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
