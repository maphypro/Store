import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CourseType, ModuleType } from '../../types/CourseTypes'
import uniqueRandom from 'unique-random'
import {enumerateModules} from '../../utils/enumerateModules'

type StateType = {
    id: number,
    title: string,
    cards: CourseType[],
    ownerCourses: CourseType[],
    actualModules: ModuleType[],
    modulesForExchange: ModuleType[],
    needToRerender: number
}

const initialState: StateType = {
    id: -1,
    title: '',
    cards: [],
    ownerCourses: [],
    actualModules: [],
    modulesForExchange: [],
    needToRerender: 0
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
        loadModulesForCourse: (state, action: PayloadAction<{ modules: ModuleType[] }>) => {

            const { modules } = action.payload;

            state.actualModules = modules;
        },
        initializeModulesForExchange: (state) => {
            state.modulesForExchange = state.actualModules
        },
        createNewModule: (state) => {
            const modulesNumber = state.modulesForExchange.length + 1;
            const random = uniqueRandom(-10000, 0);
            const newModule = {
                id: -1,
                client_id: random(),
                name: `Новый модуль ${modulesNumber}`,
                description: '',
                modulesNumber: modulesNumber
            } 
            state.modulesForExchange.push(newModule)
        },
        deleteModule: (state, action: PayloadAction<{client_id: number}>) => {
            const { client_id } = action.payload;
            state.modulesForExchange = state.modulesForExchange.filter(module_ => module_.client_id !== client_id);
            state.modulesForExchange = enumerateModules(state.modulesForExchange);
            state.needToRerender++;
        },
        changeModule: (state, action: PayloadAction<{ client_id: number, title: string | null, description: string | null}>) => {
            const { client_id, title, description } = action.payload;
            state.modulesForExchange.forEach(module_ => {
                if (module_.client_id === client_id) {
                    module_.description = description ? description : module_.description;
                    module_.name = title ? title : module_.name;
                }
            })
        },
    }
})

export const {
    createCourse,
    loadCourseCards,
    updateLoadedCourses,
    loadModulesForCourse,
    createNewModule,
    changeModule,
    deleteModule,
    initializeModulesForExchange
} = courseSlice.actions;

export default courseSlice.reducer;