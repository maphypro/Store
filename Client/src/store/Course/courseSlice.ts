import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { CourseType } from '../../types/CourseTypes'
import { access } from 'fs'

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
            state.ownerCourses = [...state.ownerCourses, action.payload]
        },
        updateLoadedCourses: (state, action: PayloadAction<CourseType[]>) => {
            state.ownerCourses = action.payload
        },
        loadCourseCards(state, action: PayloadAction<CourseType[]>) {
            state.cards = action.payload
        }
    }
})

export const {createCourse, loadCourseCards, updateLoadedCourses} = courseSlice.actions;

export default courseSlice.reducer;