import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5002/',
    // crendentials: "include" will face CORS if credential is not provided
    credentials: "same-origin", 
    prepareHeaders: (headers) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            headers.set("authorization", `${accessToken}`);
            headers.set("Content-Type", "application/json");
        }

        return headers;
    },
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    return await baseQuery(args, api, extraOptions);
};