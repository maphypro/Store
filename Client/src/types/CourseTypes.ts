export type CourseType = {
    id: number,
    title: string,
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
    courseProgram?: Module[]
}

export type Module = {
    id: number,
    title: string,
    description?: string,
    lessons: Lesson[] | null 
}

export type Lesson = {
    id: number,
    title: string,
    steps: Step[] | null
}

export type Step = {
     id: number
}