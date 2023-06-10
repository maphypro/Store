import { Container, TextField, Button, Typography } from "@mui/material"
import { createCourse } from "../store/CourseCreate/courseCreateSlice"

export default function CourseCreateInitial() {
  return (
    <Container sx={
        { w: 1, display: 'flex', flexDirection: 'column', mt:2}
    }>
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
  )
}
