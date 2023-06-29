import { ModuleType } from "../types/CourseTypes";

const enumerateModules =  (modules: ModuleType[]): ModuleType[] => {
    return modules.map( (module_, index) => {
        module_.modulesNumber = index + 1;
        return module_;
    })
}


export  {enumerateModules};