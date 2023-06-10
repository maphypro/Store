import { Box, Container, Typography } from '@mui/material';
import React from 'react'
import CourseCreateInitial from '../../components/CourseCreateInitial';
import { useCreateEmptyCourseMutation } from '../../store/CourseCreate/courseCreateApi';

export default function NewCourse() {




    return (
        <Container maxWidth='lg' sx={
            { w: 1, display: 'flex', flexDirection: 'column', }
        }>
            <Typography variant="h5" sx={{ mt: 2 }}>
                Создание нового курса
            </Typography>
            <CourseCreateInitial />
        </Container>
    );
}
