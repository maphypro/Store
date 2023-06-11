import { createSlice } from '@reduxjs/toolkit'

import { CourseCreateType } from '../../types/CourseCreateTypes'


type CoursesList = {
    avatar?: string,
    title: string
}

const initialState: Partial<CourseCreateType> & { coursesList?: CoursesList[] } = {
    id: -1,
    title: '-1'
}

const courseCreateSlice = createSlice({
    name: 'dsa',
    initialState,
    reducers: {
        createCourse: (state, action) => {
            state.title = action.payload.title
            state.id = action.payload.id
        }
    }
})

export const { createCourse } = courseCreateSlice.actions

export default courseCreateSlice.reducer
