import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createCourse } from './courseCreateSlice';
import { redirect } from 'react-router-dom';

export const courseCreateApi = createApi({
    reducerPath: 'courseCreateApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5002/', credentials: "same-origin",
        prepareHeaders: (headers) => {
            const token = localStorage?.getItem('token');
            if (token) {
                headers.set('Authorization', token)
            }
            return headers;
        }
    }),
    endpoints: build => ({
        createEmptyCourse: build.mutation<any, any>({
            query: (title: any) => ({
                url: '/home/user/create/new_course',
                method: 'POST',
                body: {title: title},
            }),
            async onQueryStarted(id, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled; //get {title, id}
                    dispatch(createCourse(data));
                } catch(e) {
                    console.log('error')
                }
            },
        })
    })
});

export const {useCreateEmptyCourseMutation} = courseCreateApi;