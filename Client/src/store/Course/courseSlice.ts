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

            modulesForSorting = modulesForSorting.sort((a, b) => a.moduleNumber - b.moduleNumber);

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
                title: `Новый модуль ${modulesNumber}`,
                description: '',
                moduleNumber: modulesNumber
            }
            state.modulesForExchange.push(newModule)
        },
        deleteModule: (state, action: PayloadAction<{ client_id: number, modulesNumber: number }>) => {
            const { client_id, modulesNumber } = action.payload;
            state.modulesForExchange = state.modulesForExchange.filter(module_ => module_.moduleNumber !== modulesNumber);
            state.modulesForExchange = enumerateModules(state.modulesForExchange);
            state.needToRerender++;
        },
        changeModule: (state, action: PayloadAction<{ client_id: number, modulesNumber: number, title: string | null, description: string | null }>) => {
            const { client_id, title, description, modulesNumber } = action.payload;
            state.modulesForExchange.forEach(module_ => {
                if (module_.moduleNumber === modulesNumber) {
                    module_.description = description ? description : module_.description;
                    module_.title = title ? title : module_.title;
                }
            })
        },
        updateLoadedLessonsForCourse: (state, action: PayloadAction<{ lessons: LessonType[] }>) => {

            let { lessons } = action.payload;
            let lessonsForSorting: LessonType[] = [...lessons];

            lessonsForSorting = lessonsForSorting.sort((a, b) => a.lessonNumber - b.lessonNumber);
            lessonsForSorting = lessonsForSorting.map(lesson => {
                return {
                    ...lesson,
                    status: 'SAVED'
                }

            })
            state.actualLessons = lessonsForSorting;
            state.lessonsForExchange = lessonsForSorting;

        },
        initializeLessonsForExchange: (state) => {
            state.lessonsForExchange = state.actualLessons
        },
        createNewLesson: (state, action: PayloadAction<{ code: number, title: string }>) => {

            const { code } = action.payload;
            const { title } = action.payload;

            const random = uniqueRandom(-10000, -1);

            const newLesson : LessonType = {
                id: -1,
                code: code,
                client_lesson_id: random(),
                title: title,
                lessonNumber: -1,
                status: 'CREATED'
            }
            state.lessonsForExchange.push(newLesson)

            state.lessonsForExchange = state.lessonsForExchange.sort((a, b) => a.code - b.code)
            state.lessonsForExchange = enumerateLessons(state.lessonsForExchange, state.modulesForExchange);


        },
        deleteLesson: (state, action: PayloadAction<{ lessonNumber: number }>) => {
            const { lessonNumber } = action.payload;
            state.lessonsForExchange =
                state.lessonsForExchange.filter(lesson => lesson.lessonNumber !== lessonNumber);
            state.lessonsForExchange = enumerateLessons(state.lessonsForExchange, state.modulesForExchange);
            state.needToRerender++;
        },
        changeLesson: (state, action: PayloadAction<{ lessonNumber: number, title: string | null }>) => {
            const { lessonNumber, title } = action.payload;
            state.lessonsForExchange.forEach(lesson => {
                if (lesson.lessonNumber === lessonNumber) {
                    lesson.title = title ? title : lesson.title;
                }
            })

        },
        clearActualCourse: (state) => {
            state.modulesForExchange = []
            state.lessonsForExchange = []
            state.actualLessons = []
            state.actualModules = []
        }
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
    initializeModulesForExchange,
    updateLoadedLessonsForCourse,
    createNewLesson,
    changeLesson,
    deleteLesson,
    initializeLessonsForExchange,
    clearActualCourse
} = courseSlice.actions;

export default courseSlice.reducer;