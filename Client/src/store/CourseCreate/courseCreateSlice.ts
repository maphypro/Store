import { createSlice } from '@reduxjs/toolkit'

import { CourseCreateType } from '../../types/CourseCreateTypes'


const initialState: CourseCreateType = {
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
