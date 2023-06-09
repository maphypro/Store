import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createCourse } from './courseCreateSlice';

export const courseCreateApi = createApi({
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
        createEmptyCourse: build.mutation({
            query: (courseName: string) => ({
                url: '/create_post',
                method: 'POST',
                body: courseName,
            }),
            async onQueryStarted(id, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled; //get {title, course_id}
                    dispatch(createCourse(data));
                } catch(e) {
                    
                }
            },
        })
    })
});