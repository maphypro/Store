import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch } from "../../hook";
import { createCourse } from "../../store/Course/courseCreateSlice";
import { useCreateEmptyCourseMutation } from "../../store/Course/courseApi";
import CourseCreateInitial from "../../components/CourseCreateInitial";


const CoursesList = () => {

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
};



export default CoursesList;