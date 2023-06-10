import { Button, Container, Typography } from "@mui/material";
import SyllabusView from "../../components/SyllabusView";

export default function Syllabus() {
  return (
    <Container maxWidth='lg' sx={{display:'flex', flexDirection:'column', w:'1000px'}}>
        <Typography variant='h5'>
            Программа курса
        </Typography>
        <Button>
            Редактировать содержание
        </Button>
        <SyllabusView />
    </Container>    
  )
}
