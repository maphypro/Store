import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { loadCourseCards } from './courseCardSlice';
import { CourseCardType } from '../types/CourseCardTypes';

export const courseCardApi = createApi({
    reducerPath: 'courseCardApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5002/', credentials: "same-origin",
    }),

    endpoints: build => ({
        loadCards: build.query<CourseCardType[], void>({
            query: () => `api/demo`,
            async onQueryStarted(id, {dispatch, queryFulfilled}) {
                const  {data}  = await queryFulfilled;
                console.log(data)
                dispatch(loadCourseCards(data))
            }
        }),
        loadOneCard: build.query<CourseCardType, void>({
            query: (id) => `api/demo/${id}`
        })
        
    }),
})

export const {useLoadCardsQuery} = courseCardApi
