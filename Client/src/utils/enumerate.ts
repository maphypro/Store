import { LessonType, ModuleType } from "../types/CourseTypes";

const enumerateModules =  (modules: ModuleType[]): ModuleType[] => {
    return modules.map( (module_, index) => {
        module_.modulesNumber = index + 1;
        return module_;
    })
}

const enumerateLessons =  (lessons: LessonType[]): LessonType[] => {
    return lessons.map( (lesson, index) => {
        lesson.lessonNumber = index + 1;
        return lesson;
    })
}

export  {enumerateModules, enumerateLessons};