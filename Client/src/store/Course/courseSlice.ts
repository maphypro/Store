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
    //    3.1. module exist in modulesPreparedToSave -> just remove module from there
    //    3.2. module exist in modulesPreparedToChange -> move module to modulesPreparedToDelete and remove from other array
    //    3.3. module exist in courseProgram -> move module to modulesPreparedToDelete and remove from other array
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
        loadModulesForCourse: (state, action: PayloadAction<{ courseId: number, modules: ModuleType[] }>) => {

            const { courseId } = action.payload;
            const { modules } = action.payload;

            state.ownerCourses = state.ownerCourses.map(course => {
                if (course.id === courseId) {
                    course.courseProgram = [];
                    modules.forEach(module_ => {
                        course.courseProgram.push(module_)
                    });
                    return course;
                }
                return course;
            })

        },
        
        createNewModulePreparedToSave: (state, action: PayloadAction<{ courseId: number }>) => {
            const { courseId } = action.payload;
            const moduleNumber = state.modulesPreparedToSave.length +
                (state.ownerCourses.find(course => course.id === courseId)?.courseProgram?.length || 0);
            const emptyModule: ModuleType = { id: 0, modulesNumber: moduleNumber, name: `Новый модуль ${moduleNumber}` }
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
            if (courseProgram) {
                courseProgram.forEach(module_ => {
                    if (module_.modulesNumber === moduleNumber) {
                        // add module to modulesPreparedToChange if not exists
                        isChangingModuleSaved = true;
                        let alreadyExist = false;
                        state.modulesPreparedToChange.forEach(modulePrepToChange => {
                            if (modulePrepToChange.modulesNumber === moduleNumber) {
                                alreadyExist = true;
                                // just change values
                                modulePrepToChange.name = title;
                                modulePrepToChange.description = description;
                            }
                        })
                        if (!alreadyExist) {
                            // add and change
                            const moduleCopy = module_;
                            moduleCopy.description = description;
                            moduleCopy.name = title;
                            state.modulesPreparedToChange.push(moduleCopy)
                        }
                    }
                })
            }
            if (!isChangingModuleSaved) {
                state.modulesPreparedToSave.forEach(module_ => {
                    console.log(moduleNumber)
                    if (module_.modulesNumber === moduleNumber) {
                        module_.name = title;
                        module_.description = description;
                    }
                })
            }
        },
        deleteModule: (state, action: PayloadAction<{ courseId: number, moduleNumber: number }>) => {
            const { courseId } = action.payload;
            const { moduleNumber } = action.payload;
            let isModuleExistInCourseProgram = false;
            const course = state.ownerCourses.find(course => courseId === course.id);
            if (course && course.courseProgram) {
                course.courseProgram.forEach(module_ => {
                    if (module_.modulesNumber === moduleNumber) {
                        isModuleExistInCourseProgram = true;
                        state.modulesPreparedToDelete.push(module_)
                    }
                })
            }
            if (isModuleExistInCourseProgram) {
                state.ownerCourses.find(course => courseId === course.id)?.courseProgram?.
                    filter(module_ => module_.modulesNumber !== moduleNumber)
            }
            else {
                //Module does not exist in courseProgram -> 
                //module may exist in modulesPreparedToSave and modulesPreparedToChange
                let moduleNeedToBeDeleted: ModuleType | null = null;
                //check modulesPreparedToSave
                state.modulesPreparedToSave =
                    state.modulesPreparedToSave.filter(module_ => module_.modulesNumber !== moduleNumber)

                //check modulesPreparedToChange
                state.modulesPreparedToChange.forEach(module_ => {
                    if (module_.modulesNumber === moduleNumber) {
                        moduleNeedToBeDeleted = module_;
                    }
                })
                state.modulesPreparedToChange =
                    state.modulesPreparedToChange.filter(module_ => module_.modulesNumber !== moduleNumber)

                if (moduleNeedToBeDeleted) {
                    state.modulesPreparedToDelete.push(moduleNeedToBeDeleted)
                }
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