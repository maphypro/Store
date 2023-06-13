import { Button, Container, Typography } from "@mui/material";
import SyllabusView from "../../components/SyllabusView";
import { useLoadModulesQuery } from "../../store/Course/courseApi";
import { useParams } from "react-router-dom";

export default function Syllabus() {

  const {id} = useParams();

  let course_id:number = id ? +id : -1

  useLoadModulesQuery({id: course_id});

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
