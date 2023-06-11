import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserReg, UserAuth } from '../../types/UserTypes'
import { setAuthStatus } from './userSlice';



export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5002/', credentials: "same-origin",
    }),

    endpoints: build => ({
        registration: build.mutation<any, UserReg>({
            query: (userRegData: UserReg) => ({
                url: `register`,
                method: 'POST',
                body: userRegData,
            }),
            async onQueryStarted(id, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setAuthStatus(true))
                    localStorage.setItem("token", `Bearer ${data.token}`);
                } catch (err) {
                    dispatch(setAuthStatus(false))
                }
            },
        }),
        login: build.mutation<any, UserAuth>({
            query: (userAuthData: UserAuth) => ({
                url: `authenticate`,
                method: 'POST',
                body: userAuthData
            }),
            async onQueryStarted(id, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setAuthStatus(true))
                    localStorage.setItem("token", `Bearer ${data.token}`);
                } catch (err) {
                    dispatch(setAuthStatus(false))
                }
            },
        
            
        })
    })
}
);

export const { useRegistrationMutation, useLoginMutation } = userApi;