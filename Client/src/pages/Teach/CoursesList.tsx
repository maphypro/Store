import { Box, Button, Container, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";

import CourseCreateInitial from "../../components/CourseCreateInitial";
import { useAppSelector } from "../../hook";
import { useEffect } from "react";
import { useLoadCoursesListQuery } from "../../store/Course/courseApi";
import CourseListItem from "../../components/CourseListItem";


const CoursesList = () => {

    // 2 options: 
    // 1) user have no created courses
    // 2) user have creted courses, at least one


    useLoadCoursesListQuery(12);

    const courses = useAppSelector(state => state.courseReducer.ownerCourses)


    if (courses.length === 0) {
        return (
            <Container maxWidth='lg' sx={
                { w: 1, display: 'flex', flexDirection: 'column', }
            }>
                <Typography variant="h5" sx={{ mt: 2 }}>
                    Курсы
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    У вас пока нет курсов, создайте первый.
                </Typography>
                <CourseCreateInitial />
            </Container>
        );
    }
    
    return (
        <Container maxWidth='lg' sx={
            { w: 1, display: 'flex', flexDirection: 'column', }
        }>
            <Typography variant="h5" sx={{ mt: 2 }}>
                Курсы
            </Typography>
            <List>
                {
                    courses.map((course) => {
                        return (
                            <ListItem>
                                <ListItemText>
                                    <CourseListItem course={course}/>
                                </ListItemText>
                            </ListItem>
                        )
                    })
                }
            </List>
        </Container>
    )

};



export default CoursesList;