import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createCourse, loadCourseCards, updateLoadedModulesForCourse, updateLoadedCourses, updateLoadedLessonsForCourse } from './courseSlice';
import { CourseType, LessonType, ModuleType } from '../../types/CourseTypes';
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
                    url: `modules/get_modules`,
                    params: { id }
                }
            },
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(updateLoadedModulesForCourse({ modules: data }));
                } catch (e) {
                    console.log(e);
                    console.log('Cannot load modules')
                }
            }
        }),
        updateActualModules: build.mutation<any, { courseId: number, modules: ModuleType[] }>({
            query: ({ courseId, modules }: { courseId: number, modules: ModuleType[] }) => {
                return {
                    url: 'modules/update_modules',
                    method: 'POST',
                    body: {
                        courseId,
                        modules
                    }
                }
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                dispatch(updateLoadedModulesForCourse({ modules: data }));

            }
        }),
        loadLessons: build.query<LessonType[], number>({
            query: (moduleId: number) => {
                return {
                    url: `lesson/get_lessons`,
                    params: { idmodules: moduleId },
                    method: 'GET'
                }
            },
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(updateLoadedLessonsForCourse({ lessons: data }));
                } catch (e) {
                    console.log(e);
                    console.log('Cannot load lessons')
                }
            }
        }),
        updateActualLessons: build.mutation<any, { courseId: number, lessons: ModuleType[] }>({
            query: ({ courseId, lessons }: { courseId: number, lessons: ModuleType[] }) => {
                return {
                    url: 'modules/update_modules',
                    method: 'POST',
                    body: {
                        courseId,
                        lessons
                    }
                }
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                dispatch(updateLoadedModulesForCourse({ modules: data }));

            }
        }),
    })
});





export const { useCreateEmptyCourseMutation,
    useLoadCardsQuery,
    useLoadCoursesListQuery,
    useLoadModulesQuery,
    useUpdateActualModulesMutation,
    useLazyLoadModulesQuery } = courseApi;