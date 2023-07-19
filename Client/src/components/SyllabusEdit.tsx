import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hook";
import { Box, Button, List, ListItem } from "@mui/material";
import SyllabusEditModule from "./SyllabusEditModule";
import SyllabusEditLesson from "./SyllabusEditLesson";
import { createNewModule, initializeLessonsForExchange, initializeModulesForExchange } from "../store/Course/courseSlice";
import { useEffect } from "react";
import { useLazyLoadFullCourseQuery } from "../store/Course/courseApi";



export default function SyllabusEdit() {
  const { id } = useParams();

  let course_id: number = id ? +id : -1

  const dispatch = useAppDispatch();


  const [loadFullCourse] = useLazyLoadFullCourseQuery()

  useEffect(() => {
    loadFullCourse(course_id)
  }, [course_id])

  useEffect(() => {
    dispatch(initializeModulesForExchange());
    dispatch(initializeLessonsForExchange());
  })

  const modulesForExchange = useAppSelector(state => state.courseReducer.modulesForExchange)
  const lessonsForExchange = useAppSelector(state => state.courseReducer.lessonsForExchange)


  const handleCreateNewModule = () => {
    dispatch(createNewModule())
  }



  if (modulesForExchange.length === 0) {
    return (
      <Box sx={{ w: 1 }} >
        <Box>
          В курсе пока нет ни одного урока.
          Создайте первый модуль, чтобы добавить уроки
        </Box>
        <Button variant="contained" sx={{ ml: 2 }} onClick={handleCreateNewModule}>
          Новый модуль
        </Button>
      </Box>
    )
  }


  return (
    <Box sx={{ w: 1 }} >
      {
        <List sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          w: 1,
        }}>

          {
            modulesForExchange.map(module_ => {
              return (
                <ListItem sx={{
                  mb: 3, w: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <SyllabusEditModule module_={module_} courseId={course_id} />
                  <List sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 2,
                    border: '0px solid blue',
                    minWidth: '100%'
                  }}>
                    {
                      lessonsForExchange.map(lesson => {
                        if (module_.code === lesson.code) {
                          return (
                            <ListItem sx={{ flexGrow: 4 }}>
                              <SyllabusEditLesson
                                lesson={lesson}
                                courseId={course_id}
                                status={lesson.status}
                                code={lesson.code} />
                            </ListItem>
                          )
                        }
                      })

                    }
                    <ListItem sx={{}}>
                      <SyllabusEditLesson lesson={null} courseId={course_id} status={'NEW'} code={module_.code} />
                    </ListItem>
                  </List>
                </ListItem>
              )
            })
          }
        </List >
      }
      <Button variant="contained" sx={{ ml: 2 }} onClick={handleCreateNewModule}>
        Новый модуль
      </Button>
    </Box >
  )
}


