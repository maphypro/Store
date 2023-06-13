import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { CourseType, ModuleType } from '../../types/CourseTypes'
import { access } from 'fs'

type StateType = {
    id: number,
    title: string,
    cards: CourseType[],
    ownerCourses: CourseType[],

}

const initialState: StateType = {
    id: -1,
    title: '',
    cards: [],
    ownerCourses: [],
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
        },
        loadModulesForCourse: (state, action: PayloadAction<ModuleType[]>) => {
            action.payload.forEach(module_ => {
                state.ownerCourses.push(module_)
            })
        }
    }
})

export const {createCourse, loadCourseCards, updateLoadedCourses, loadModulesForCourse} = courseSlice.actions;

export default courseSlice.reducer;