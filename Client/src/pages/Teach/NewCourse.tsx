import { Box, Container, Typography } from '@mui/material';
import React from 'react'
import CourseCreateInitial from '../../components/CourseCreateInitial';
import { useCreateEmptyCourseMutation } from '../../store/CourseCreate/courseCreateApi';

export default function NewCourse() {
    const [createCourse, { data, error }] = useCreateEmptyCourseMutation();


    if (error && 'status' in error) {
        return <Box>{error.status}</Box>
    }


    return (
        <Container maxWidth='lg' sx={
            { w: 1, display: 'flex', flexDirection: 'column', }
        }>
            <Typography variant="h5" sx={{mt:2}}>
                Курсы
            </Typography>
            <Typography variant="body1" sx={{mt:2}}>
                У вас пока нет курсов, создайте первый.
            </Typography>
            <CourseCreateInitial />
        </Container>
    );
}
