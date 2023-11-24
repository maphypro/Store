import { Box, Button, Container, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import CourseCreateInitial from "../../components/CourseCreateInitial";
import { useAppSelector } from "../../hook";
import { useEffect } from "react";
import { useLoadCoursesListQuery } from "../../store/Course/courseApi";
import CourseListItem from "../../components/CourseListItem";


const CoursesList = () => {

    useLoadCoursesListQuery(12);

    const courses = useAppSelector(state => state.courseReducer.ownerCourses)


    if (courses.length === 0) {
        return (
            <Container maxWidth='lg' sx={
                { w: 1, display: 'flex', flexDirection: 'column', padding: 0 }
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
            { w: 1, display: 'flex', flexDirection: 'column', p: 0 }
        }>
            <Typography variant="h5" sx={{ mt: 2 }}>
                Курсы
            </Typography>
            <List>
                {
                    courses.map((course) => {
                        return (
                            <ListItem key={uuidv4()}>
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