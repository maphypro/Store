import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createCourse } from './courseCreateSlice';

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
            query: (courseName: any) => ({
                url: '/create_post',
                method: 'POST',
                body: {courseName: courseName},
            }),
            async onQueryStarted(id, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled; //get {title, course_id}
                    dispatch(createCourse(data));
                    //redirect on course/:course_id/syllabus
                    //window.history.pushState({},'','/course')
                } catch(e) {
                    console.log('')
                }
            },
        })
    })
});

export const {useCreateEmptyCourseMutation} = courseCreateApi;