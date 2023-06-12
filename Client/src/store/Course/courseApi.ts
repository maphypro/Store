import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createCourse, loadCourseCards, updateLoadedCourses } from './courseSlice';
import { CourseType } from '../../types/CourseTypes';
import { baseQueryWithReauth } from './baseQuery';

export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: baseQueryWithReauth,
    endpoints: build => ({
        loadCards: build.query<CourseType[], void>({
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
        loadOneCard: build.query<CourseType, number>({
            query: (id) => `api/demo/${id}`
        }),
        createEmptyCourse: build.mutation<CourseType, string>({
            query: (title: string) => ({
                url: '/course/new_course',
                method: 'POST',
                body: {title: title},
            }),
            async onQueryStarted(id, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled; 
                    dispatch(createCourse(data));
                } catch(e) {
                    console.log('error')
                }
            },
        }),
        loadCoursesList: build.query<CourseType[], number>({
            query: (id: number) => `/main/courses`,
            async onQueryStarted(id, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled
                    dispatch(updateLoadedCourses(data))
                }
                catch (e) {
                    console.log('cannot load courses')
                }
            }
        })
    })
});

export const {useCreateEmptyCourseMutation, useLoadCardsQuery, useLoadCoursesListQuery} = courseApi;