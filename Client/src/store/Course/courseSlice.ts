import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CourseType, ModuleType } from '../../types/CourseTypes'

type StateType = {
    id: number,
    title: string,
    cards: CourseType[],
    ownerCourses: CourseType[],
    modulesPreparedToSave: ModuleType[],
    modulesPreparedToChange: ModuleType[],
    modulesPreparedToDelete: ModuleType[],
    enumSequence: Number[]
}

const initialState: StateType = {
    id: -1,
    title: '',
    cards: [],
    ownerCourses: [],
    enumSequence: [],
    //how to fill array below:
    // 1) clicked button "Новый модуль" -> add module to modulesPreparedToSave
    // 2) title or description changed:
    //    2.1. if module exist in course.courseProgram then add module to modulesPreparedToChange.
    //          if modulesPreparedToChange already contain that module then jush change it into array
    //    2.2. otherwise change title/description in modulesPreparedToSave
    // 3) clicket button "delete"
    //    3.1. module exsist in modulesPreparedToSave -> just remove module from there
    //    3.2. module exsist in modulesPreparedToChange -> move module to modulesPreparedToDelete
    // How to enumerate modules? 
    // on delete action need to iterate over the arrays course.courseProgram and modulesPreparedToSave and reenumerate
    // modules
    // on create action new module number  = courseProgram.length + modulesPreparedToSave.length
    modulesPreparedToSave: [], // New unsaved modules
    modulesPreparedToChange: [], // Already existing modules
    modulesPreparedToDelete: [] // Already existing modules
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
        },
        createNewModulePreparedToSave: (state, action: PayloadAction<{ courseId: number }>) => {
            const { courseId } = action.payload;
            const moduleNumber = state.modulesPreparedToSave.length +
                (state.ownerCourses.find(course => course.id === courseId)?.courseProgram?.length || 0);
            const emptyModule: ModuleType = { moduleNumber: moduleNumber, title: `Новый модуль ${moduleNumber}` }
            state.modulesPreparedToSave.push(emptyModule)
        },
        changeModule: (state, action: PayloadAction<{
            courseId: number, moduleNumber: number, title: string, description: string
        }>) => {
            const { courseId } = action.payload;
            const { moduleNumber } = action.payload;
            const { title } = action.payload;
            const { description } = action.payload;
            let courseProgram = state.ownerCourses.find(course => course.id === courseId)?.courseProgram;
            let isChangingModuleSaved = false;
            console.log(courseProgram)
            if (courseProgram) {
                courseProgram.forEach(module_ => {
                    if (module_.moduleNumber === moduleNumber) {
                        // add module to modulesPreparedToChange if not exists
                        isChangingModuleSaved = true;
                        let alreadyExist = false;
                        state.modulesPreparedToChange.forEach(modulePrepToChange => {
                            if (modulePrepToChange.moduleNumber === moduleNumber) {
                                console.log('module exist in modulesPreparedToChange')
                                alreadyExist = true;
                                // just change values
                                modulePrepToChange.title = title;
                                modulePrepToChange.description = description;
                            }
                        })
                        if (!alreadyExist) {
                            // add and change
                            console.log('module not exist in modulesPreparedToChange')
                            const moduleCopy = module_;
                            moduleCopy.description = description;
                            moduleCopy.title = title;
                            state.modulesPreparedToChange.push(moduleCopy)
                        }
                    }
                })
            }
            console.log(isChangingModuleSaved)
            if (!isChangingModuleSaved) {
                console.log('changing module not saved')
                state.modulesPreparedToSave.forEach(module_ => {
                    console.log(moduleNumber)
                    if (module_.moduleNumber === moduleNumber) {
                        console.log('YES')
                        module_.title = title; 
                        module_.description = description;
                    }
                })
            }
        }
    }
})

export const {
    createCourse,
    loadCourseCards,
    updateLoadedCourses,
    loadModulesForCourse,
    createNewModulePreparedToSave,
    changeModule
} = courseSlice.actions;

export default courseSlice.reducer;