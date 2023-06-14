import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserReg, UserAuth } from '../../types/UserTypes'
import { setUser, defaultUserState } from './userSlice';
import jwt_decode from 'jwt-decode';


type checkAuthType = {
    accessToken: string,
    refreshToken: string
}

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
                body: { ...userRegData, role: 'USER' },
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const decoded_token: any = jwt_decode(data.accessToken)
                    dispatch(setUser(
                        {
                            email: decoded_token.sub,
                            role: decoded_token.role,
                            isAuth: true
                        }
                    ))
                    localStorage.setItem("token", `Bearer ${data.accessToken}`);
                    localStorage.setItem("refresh_token", `Bearer ${data.refreshToken}`);
                } catch (err) {
                    dispatch(setUser(defaultUserState))
                }
            },
        }),
        login: build.mutation<any, UserAuth>({
            query: (userAuthData: UserAuth) => ({
                url: `authenticate`,
                method: 'POST',
                body: userAuthData
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const decoded_token: any = jwt_decode(data.accessToken)
                    dispatch(setUser(
                        {
                            email: decoded_token.sub,
                            role: decoded_token.role,
                            isAuth: true
                        }
                    ))
                    localStorage.setItem("token", `Bearer ${data.accessToken}`);
                    localStorage.setItem("refresh_token", `Bearer ${data.refreshToken}`);
                } catch (err) {
                    dispatch(setUser(defaultUserState))
                }
            },
        }),
        logout: build.query<void, void>(
            {
                query: () => (
                    {
                        url: `api/v1/auth/logout`,
                        headers: {
                            Authorization: localStorage.getItem('token') || ''
                        }
                    }
                ),
                onQueryStarted(id, { dispatch, queryFulfilled }) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('refresh_token')
                    dispatch(setUser(defaultUserState))
                }
            }
        ),
        checkAuth: build.mutation<checkAuthType, void>({
            query: () => ({
                url: '/refresh-token',
                headers: {
                    Authorization: localStorage.getItem('token') || '',
                    ContentLength: "0"
                },
                method: 'POST'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    const decoded_token: any = jwt_decode(data.accessToken)
                    dispatch(setUser(
                        {
                            email: decoded_token.sub,
                            role: decoded_token.role,
                            isAuth: true
                        }
                    ))
                    localStorage.setItem("token", `Bearer ${data.accessToken}`);
                    localStorage.setItem("refresh_token", `Bearer ${data.refreshToken}`);
                } catch (err) {

                    dispatch(setUser(defaultUserState))
                    console.log(err)
                }
            }
        })
    })
}
);

export const { useRegistrationMutation, useLoginMutation, useLazyLogoutQuery, useCheckAuthMutation } = userApi;