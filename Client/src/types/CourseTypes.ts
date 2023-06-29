export type CourseType = {
    id?: number,
    title?: string,
    image?: string,
    video?: string,
    description?: string,
    whatWillYouLearn?: string,
    forWhom?: string,
    initialRequirements?: string,
    howIsTheTraining?: string,
    whatAreYouGretting?: string,
    author?: string,
    courseTime?: number,
    price?: number,
    rating?: number,
    studentsCount?: number,
    shortDescription?: string,
    about?: string,
    courseProgram: ModuleType[]
}

export type ModuleType = {
    id: number | null,
    name: string | null,
    description: string | null,
    modulesNumber: number,
    client_id: number,
    lessons?: LessonType[] | null 
}

export type LessonType = {
    id?: number,
    title?: string,
    lessonNumber?: number,
    steps?: StepType[] | null
}

export type StepType = {
     id: number
}