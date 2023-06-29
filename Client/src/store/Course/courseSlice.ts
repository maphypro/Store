import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CourseType, LessonType, ModuleType } from '../../types/CourseTypes'
import uniqueRandom from 'unique-random'
import { enumerateLessons, enumerateModules } from '../../utils/enumerate'

type StateType = {
    id: number,
    title: string,
    cards: CourseType[],
    ownerCourses: CourseType[],
    actualModules: ModuleType[],
    modulesForExchange: ModuleType[],
    actualLessons: LessonType[],
    lessonsForExchange: LessonType[],
    needToRerender: number
}

const initialState: StateType = {
    id: -1,
    title: '',
    cards: [],
    ownerCourses: [],
    actualModules: [],
    modulesForExchange: [],
    actualLessons: [],
    lessonsForExchange: [],
    needToRerender: 0
}

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        createCourse: (state, action: PayloadAction<CourseType>) => {
            state.ownerCourses = [...state.ownerCourses, action.payload]
        },
        loadCourseCards(state, action: PayloadAction<CourseType[]>) {
            state.cards = action.payload
        },
        updateLoadedCourses: (state, action: PayloadAction<CourseType[]>) => {
            state.ownerCourses = action.payload
        },
        updateLoadedModulesForCourse: (state, action: PayloadAction<{ modules: ModuleType[] }>) => {

            let { modules } = action.payload;

            let modulesForSorting = [...modules]

            modulesForSorting = modulesForSorting.sort((a, b) => a.modulesNumber - b.modulesNumber);

            state.actualModules = modulesForSorting;
        },
        initializeModulesForExchange: (state) => {
            state.modulesForExchange = state.actualModules
        },
        createNewModule: (state) => {
            const modulesNumber = state.modulesForExchange.length + 1;
            const random = uniqueRandom(-10000, -1);
            const newModule = {
                id: -1,
                code: random(),
                name: `Новый модуль ${modulesNumber}`,
                description: '',
                modulesNumber: modulesNumber
            }
            state.modulesForExchange.push(newModule)
        },
        deleteModule: (state, action: PayloadAction<{ client_id: number, modulesNumber: number }>) => {
            const { client_id, modulesNumber } = action.payload;
            state.modulesForExchange = state.modulesForExchange.filter(module_ => module_.modulesNumber !== modulesNumber);
            state.modulesForExchange = enumerateModules(state.modulesForExchange);
            state.needToRerender++;
        },
        changeModule: (state, action: PayloadAction<{ client_id: number, modulesNumber: number, title: string | null, description: string | null }>) => {
            const { client_id, title, description, modulesNumber } = action.payload;
            state.modulesForExchange.forEach(module_ => {
                if (module_.modulesNumber === modulesNumber) {
                    module_.description = description ? description : module_.description;
                    module_.name = title ? title : module_.name;
                }
            })
        },
        updateLoadedLessonsForCourse: (state, action: PayloadAction<{ lessons: LessonType[] }>) => {

            const { lessons } = action.payload;
            let lessonsForSorting = [...lessons]

            lessonsForSorting = lessonsForSorting.sort((a, b) => a.lessonNumber - b.lessonNumber);
            state.actualLessons = lessonsForSorting;
        },
        initializeLessonsForExchange: (state) => {
            state.lessonsForExchange = state.actualLessons
        },
        createNewLesson: (state, action: PayloadAction<{ client_id_ref: number }>) => {

            const { client_id_ref } = action.payload;

            const lessonNumber = state.lessonsForExchange.length + 1;
            const random = uniqueRandom(-10000, -1);

            const newLesson = {
                id: -1,
                code: client_id_ref,
                client_lesson_id: random(),
                title: `Новый урок ${lessonNumber}`,
                lessonNumber: lessonNumber
            }
            state.lessonsForExchange.push(newLesson)
        },
        deleteLesson: (state, action: PayloadAction<{ client_lesson_id: number }>) => {
            const { client_lesson_id } = action.payload;
            state.lessonsForExchange =
                state.lessonsForExchange.filter(module_ => module_.client_lesson_id !== client_lesson_id);
            state.lessonsForExchange = enumerateLessons(state.lessonsForExchange);
            state.needToRerender++;
        },
        changeLesson: (state, action: PayloadAction<{ client_lesson_id: number, title: string | null }>) => {
            const { client_lesson_id, title } = action.payload;
            state.modulesForExchange.forEach(lesson => {
                if (lesson.code === client_lesson_id) {
                    lesson.name = title ? title : lesson.name;
                }
            })
        },
    }
})

export const {
    createCourse,
    loadCourseCards,
    updateLoadedCourses,
    updateLoadedModulesForCourse,
    createNewModule,
    changeModule,
    deleteModule,
    updateLoadedLessonsForCourse,
    initializeModulesForExchange
} = courseSlice.actions;

export default courseSlice.reducer;