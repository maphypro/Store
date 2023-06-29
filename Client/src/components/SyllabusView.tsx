import { Box, List, ListItem } from "@mui/material";
import SyllabusViewModule from "./SyllabusViewModule";
import SyllabusViewLesson from "./SyllabusViewLesson";
import { useLoadModulesQuery } from "../store/Course/courseApi";
import { useAppSelector } from "../hook";
import { useParams } from "react-router-dom";

const ModuleStyle = {


}

const LessonStyle = {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '64px'
}


export default function SyllabusView() {

    const { id } = useParams();

    let course_id: number = id ? +id : -1

    const courses = useAppSelector(state => state.courseReducer.ownerCourses);
    const active_course = courses.find(course => course.id === course_id);
    const modules = useAppSelector(state => state.courseReducer.actualModules);
    return (
        <Box >
            <List sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
            }}>
                {
                    modules.map(module_ => {
                        return (
                            <ListItem sx={ModuleStyle}>
                                <SyllabusViewModule module_={module_} />
                                <List>
                                    {
                                        module_.lessons?.map(lesson => {
                                            return (
                                                <ListItem sx={LessonStyle}>
                                                    <SyllabusViewLesson lesson={lesson}/>
                                                </ListItem>
                                            )
                                        })
                                    }
                                </List>
                            </ListItem>
                        )
                    })
                }
            </List>
        </Box>
    )
}
