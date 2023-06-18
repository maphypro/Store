import { Box, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hook";
import { useAddModulesMutation, useLazyLoadModulesQuery } from "../store/Course/courseApi";
import { loadModulesForCourse } from "../store/Course/courseSlice";

export default function FooterForEditPage() {


    const {id} = useParams();

    let course_id: number = id ? +id : -1
    
    const [load, result, lastPromise] = useLazyLoadModulesQuery();


    const modulesPreparedToSave = useAppSelector(state => state.courseReducer.modulesPreparedToSave);


    const dispatch = useAppDispatch();


    const modules = modulesPreparedToSave.map(module_ => {
        return {
            name: module_.name,
            description: module_.description,
            modulesNumber: module_.modulesNumber
        }
    })

    const [addModules, {data, error, isLoading}] = useAddModulesMutation();

    const handleSaveModules = () => {
        addModules({courseId: course_id, modules: modules});
        load({id: course_id})
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'fixed',
            minHeight: '5vh',
            minWidth: '100vw',
            background: '#CCC',
            bottom: 0, left: 0,
            p: 1, pr: 20,
        }}>
            <Button variant="contained" onClick={handleSaveModules}>
                Сохранить
            </Button>
            <Button variant="contained" sx={{ ml: 2 }}>
                <Link to='../syllabus' style={{ textDecoration: 'none', color: 'inherit' }}>
                    Вернуться к просмотру
                </Link>
            </Button>
        </Box>
    )
}
