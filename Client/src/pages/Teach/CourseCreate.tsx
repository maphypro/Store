import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch } from "../../hook";
import { createCourse } from "../../store/CourseCreate/courseCreateSlice";
import { useCreateEmptyCourseMutation } from "../../store/CourseCreate/courseCreateApi";












const CourseCreate = () => {


    const [createCourse, { data, error }] = useCreateEmptyCourseMutation();


    if (error && 'status' in error) {
        return <Box>{error.status}</Box>
    }
    
    
    return (
        <Container maxWidth='lg' sx={
            { w: 1, display: 'flex', flexDirection: 'column', }
        }>
            <Typography variant="h5">
                Создание нового курса
            </Typography>
            <TextField label='Название курса' required helperText='Максимум 64 символа'
                sx={{ w: 1, flexGrow: 1, mt: 2 }} />
            <Button onClick={() => {
                createCourse('e')
            }}>
                Создать курс
            </Button>
            <Typography sx={{ mb: 2, mt: 2, textAlign: 'left' }}>
                Начните работу над черновиком курса, перед публикацией можно будет сделать курс платным или оставить бесплатным.
            </Typography>
            <Typography sx={{ textAlign: 'left' }}>
                Открытые бесплатные курсы и уроки распространяются по лицензии Creative Commons (CC BY-SA 4.0).
            </Typography>
        </Container>
    );
};



export default CourseCreate;