import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserReg, UserAuth } from '../types/UserTypes'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5002/', credentials: "same-origin",
    }),

    endpoints: build => ({
        registration: build.mutation<UserReg, UserReg>({
            query: (userRegData: UserReg) => ({
                url: `api/v1/auth/register`,
                method: 'POST',
                body: userRegData,
            })
        }),
        login: build.mutation<UserAuth, UserAuth>({
            query: (userAuthData: UserAuth) => ({
                url: `api/v1/auth/authenticate`,
                method: 'POST',
                body: userAuthData
            })
        })
    })
}
);

export const { useRegistrationMutation, useLoginMutation } = userApi;