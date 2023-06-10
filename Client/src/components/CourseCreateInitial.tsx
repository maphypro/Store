import { Container, TextField, Button, Typography, Box } from "@mui/material"
import { useState } from "react"
import { useCreateEmptyCourseMutation } from "../store/CourseCreate/courseCreateApi";
import { useNavigate } from "react-router-dom";

export default function CourseCreateInitial() {

    const [title, setTitle] = useState('');

    const [createCourse, { data, error }] = useCreateEmptyCourseMutation();

    const navigate = useNavigate();

    if (error && 'status' in error) {
        return <Box>{error.status}</Box>
    }

    if (data && 'id' in data) {
        navigate(`/course/${data.id}/syllabus`);
    }

    return (

        <Container sx={
            { w: 1, display: 'flex', flexDirection: 'column', mt: 2 }
        }>
            <TextField
                onChange={e => setTitle(e.target.value)}
                label='Название курса'
                required
                helperText='Максимум 64 символа'
                value={title}
                sx={{ w: 1, flexGrow: 1, mt: 2 }} />
            <Button onClick={() => {
                createCourse(title)
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
    )
}
