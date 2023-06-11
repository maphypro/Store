import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createCourse } from './courseCreateSlice';
import { redirect } from 'react-router-dom';
import { CourseCardType } from '../../types/CourseCardTypes';
import { loadCourseCards } from './courseCardSlice';

export const courseApi = createApi({
    reducerPath: 'courseApi',
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
        loadCards: build.query<CourseCardType[], void>({
            query: () => `api/demo`,
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log('kek')
                    dispatch(loadCourseCards(data))
                }
                catch (e) {
                    console.log('Не судьба')
                }
            }
        }),
        loadOneCard: build.query<CourseCardType, void>({
            query: (id) => `api/demo/${id}`
        }),
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
        }),
        loadCoursesList: build.query<any, any>({
            query: (id: number) => `/main/courses`
        })
    })
});

export const {useCreateEmptyCourseMutation, useLoadCardsQuery} = courseApi;