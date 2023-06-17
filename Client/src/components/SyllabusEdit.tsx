import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hook";
import { Box, Button, List, ListItem } from "@mui/material";
import SyllabusViewLesson from "./SyllabusViewLesson";
import SyllabusViewModule from "./SyllabusViewModule";
import SyllabusEditModule from "./SyllabusEditModule";
import SyllabusEditLesson from "./SyllabusEditLesson";
import { createNewModulePreparedToSave } from "../store/Course/courseSlice";
import { useEffect } from "react";

const ModuleStyle = {
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '0px'
}

const LessonStyle = {
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '64px'
}

export default function SyllabusEdit() {
  const { id } = useParams();

  let course_id: number = id ? +id : -1

  const dispatch = useAppDispatch();

  const courses = useAppSelector(state => state.courseReducer.ownerCourses);
  const activeCourse = courses.find(course => course.id === course_id);


  const alreadyExistingModules = activeCourse?.courseProgram
  const modulesPreparedForSave = useAppSelector(state => state.courseReducer.modulesPreparedToSave);



  const handleCreateNewModule = () => {
    dispatch(createNewModulePreparedToSave({courseId: course_id}))
  }


  if (alreadyExistingModules?.length === 0 && modulesPreparedForSave.length === 0) {
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
            width: 1,

          }}>

            {
              alreadyExistingModules?.map(module_ => {
                return (
                  <ListItem sx={{ mb: 3, w: 1 }}>
                  <SyllabusEditModule module_={module_} courseId={course_id}/>
                  <List>
                    {
                      module_.lessons?.map(lesson => {
                        return (
                          <ListItem>
                            <SyllabusEditLesson />
                          </ListItem>
                        )
                      })
                    }
                  </List>
                </ListItem>
                )
              })
            }

            {
              modulesPreparedForSave?.map(module_ => {
                return (
                  <ListItem sx={{ mb: 3, w: 1 }}>
                    <SyllabusEditModule module_={module_} courseId={course_id}/>
                    <List>
                      {
                        module_.lessons?.map(lesson => {
                          return (
                            <ListItem>
                              <SyllabusEditLesson />
                            </ListItem>
                          )
                        })
                      }
                    </List>
                  </ListItem>
                )
              })
            }
          </List> 
      }
      <Button variant="contained" sx={{ ml: 2 }} onClick={handleCreateNewModule}>
        Новый модуль
      </Button>
    </Box>
  )
}
