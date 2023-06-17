import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createCourse, loadCourseCards, loadModulesForCourse, updateLoadedCourses } from './courseSlice';
import { CourseType, ModuleType } from '../../types/CourseTypes';
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
                body: { title: title },
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(createCourse(data));
                } catch (e) {
                    console.log('error')
                }
            },
        }),
        loadCoursesList: build.query<CourseType[], number>({
            query: (id: number) => `/main/courses`,
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(updateLoadedCourses(data))
                }
                catch (e) {
                    console.log('cannot load courses')
                }
            }
        }),
        loadModules: build.query<ModuleType[], { id: number }>({
            query: (arg) => {
                const { id } = arg;
                return {
                    url: `course/get_modules`,
                    params: { id }
                }
            },
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(loadModulesForCourse(data));
                } catch (e) {
                    console.log('Cannot load modules')
                }
            }
        }),
        addModules: build.mutation<any, any>({
            query: ({ courseId, modules }: { courseId: number, modules: Array<string> }) => {
                return {
                    url: 'course/add_modules',
                    method: 'POST',
                    body: {
                        courseId,
                        modules
                    }
                }
            },

        })
    })
});

export const { useCreateEmptyCourseMutation, useLoadCardsQuery, useLoadCoursesListQuery, useLoadModulesQuery } = courseApi;