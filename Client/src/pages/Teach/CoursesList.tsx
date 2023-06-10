import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch } from "../../hook";
import { createCourse } from "../../store/CourseCreate/courseCreateSlice";
import { useCreateEmptyCourseMutation } from "../../store/CourseCreate/courseCreateApi";
import CourseCreateInitial from "../../components/CourseCreateInitial";


const CoursesList = () => {


    const [createCourse, { data, error }] = useCreateEmptyCourseMutation();


    if (error && 'status' in error) {
        return <Box>{error.status}</Box>
    }
    
    
    return (
        <Container maxWidth='lg' sx={
            { w: 1, display: 'flex', flexDirection: 'column', }
        }>
            <Typography variant="h5" sx={{mt:2}}>
                Создание нового курса
            </Typography>
            <CourseCreateInitial />
        </Container>
    );
};



export default CoursesList;