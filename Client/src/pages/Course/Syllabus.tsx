import { Box, Button, Container, Typography } from "@mui/material";
import SyllabusView from "../../components/SyllabusView";
import { useLazyLoadFullCourseQuery, useLoadFullCourseQuery, useLoadModulesQuery } from "../../store/Course/courseApi";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../hook";
import { useEffect, useState } from "react";

export default function Syllabus() {

  const { id } = useParams();

  let course_id: number = id ? +id : -1

  //useLoadFullCourseQuery(course_id);

  const [loadFullCourse] = useLazyLoadFullCourseQuery()

  useEffect(() => {
    loadFullCourse(course_id)
  }, [course_id])

  const modules = useAppSelector(state => state.courseReducer.actualModules);

  return (
    <Container maxWidth='lg' sx={{ display: 'flex', flexDirection: 'column', w: '1000px' }}>
      <Typography variant='h5'>
        Программа курса
      </Typography>
      {
        modules && modules.length > 0 ?
          <SyllabusView /> :
          <Box>
            <Typography variant="body2">
              В курсе пока что нет ни одного урока.
              Добавьте свой первый урок в редакторе содержания курса.
            </Typography>
          </Box>
      }
      <Link to='../edit-syllabus'>
        <Button>
          Редактировать содержание
        </Button>
      </Link>
    </Container>
  )
}
