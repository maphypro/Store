import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hook";
import { Box, Button, List, ListItem } from "@mui/material";
import SyllabusEditModule from "./SyllabusEditModule";
import SyllabusEditLesson from "./SyllabusEditLesson";
import { createNewModule, initializeModulesForExchange } from "../store/Course/courseSlice";
import { useEffect } from "react";



export default function SyllabusEdit() {
  const { id } = useParams();

  let course_id: number = id ? +id : -1

  const dispatch = useAppDispatch();


  const modulesForExchange = useAppSelector(state => state.courseReducer.modulesForExchange)
  const needToRerender = useAppSelector(state => state.courseReducer.needToRerender)


  const handleCreateNewModule = () => {
    dispatch(createNewModule())
  }

  useEffect(() => {
    console.log('SyllabusEdit')
  })


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
                <ListItem sx={{ mb: 3, w: 1 }}>
                  <SyllabusEditModule module_={module_} courseId={course_id} />
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


