import { Box, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hook";
import { useUpdateActualModulesMutation } from "../store/Course/courseApi";

export default function FooterForEditPage() {


    const { id } = useParams();

    let course_id: number = id ? +id : -1


    const dispatch = useAppDispatch()

    const modules = useAppSelector(state => state.courseReducer.modulesForExchange);

    const [updateActualModules, varsAdd] = useUpdateActualModulesMutation();


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
            <Button variant="contained" onClick={() => updateActualModules({courseId: course_id, modules: modules})}>
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
