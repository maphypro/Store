import { LessonType, ModuleType } from "../types/CourseTypes";

const enumerateModules = (modules: ModuleType[]): ModuleType[] => {
    return modules.map((module_, index) => {
        module_.moduleNumber = index + 1;
        return module_;
    })
}

const enumerateLessons = (lessons: LessonType[], modules: ModuleType[]): LessonType[] => {

    const enumLessons: LessonType[] = [...lessons];

    let lastCode = -1;
    let lessonCounter: number = 1;

    for (let i = 0; i < enumLessons.length; i++) {
        const currentLesson = enumLessons[i];
        //console.log(`${currentLesson.code}`)
        const module_: ModuleType | undefined = modules.find(module_ => module_.code === currentLesson.code)
        const moduleNumber: number = module_?.moduleNumber || 999
        console.log(`${module_?.moduleNumber} ${moduleNumber}`)
        if (lastCode  !== -1 && lastCode !== currentLesson.code) {
            lessonCounter = 1;
        }

        currentLesson.lessonNumber = (moduleNumber*10 + lessonCounter) / 10;
        lessonCounter++;
        lastCode = currentLesson.code;
        enumLessons[i] = currentLesson;
    }

    return enumLessons;
}

export { enumerateModules, enumerateLessons };