import { Box, List, ListItem } from "@mui/material";
import SyllabusViewModule from "./SyllabusViewModule";
import SyllabusViewLesson from "./SyllabusViewLesson";
import { useLoadModulesQuery } from "../store/Course/courseApi";
import { useAppSelector } from "../hook";
import { useParams } from "react-router-dom";


export default function SyllabusView() {

    const { id } = useParams();

    let course_id: number = id ? +id : -1

    const modules = useAppSelector(state => state.courseReducer.actualModules);
    const lessons = useAppSelector(state => state.courseReducer.actualLessons);

    return (
            <Box>
                <List sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    w: 1,
                }}>
                    {
                        modules.map(module_ => {
                            return (
                                <ListItem sx={{
                                    mb: 3, w: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>
                                    <SyllabusViewModule module_={module_} />
                                    <List sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        flexGrow: 2,
                                        border: '0px solid blue',
                                        minWidth: '100%'
                                    }}>
                                        {
                                            lessons.map(lesson => {
                                                if (module_.code === lesson.code) {
                                                    return (
                                                        <ListItem sx={{ flexGrow: 4 }}>
                                                            <SyllabusViewLesson lesson={lesson} />
                                                        </ListItem>
                                                    )
                                                }
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
