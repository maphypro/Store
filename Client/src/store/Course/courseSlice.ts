import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { CourseType } from '../../types/CourseTypes'

type StateType = {
    id: number,
    title: string,
    cards: CourseType[],
    ownerCourses: CourseType[]
}

const initialState: StateType = {
    cards: [],
    ownerCourses: [],
    title: '',
    id: -1
}

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        createCourse: (state, action: PayloadAction<CourseType>) => {
            state.title = action.payload.title
            state.id = action.payload.id
        },
        loadCourseCards(state, action: PayloadAction<CourseType[]>) {
            state.cards = action.payload
        }
    }
})

export const {createCourse, loadCourseCards} = courseSlice.actions;

export default courseSlice.reducer;