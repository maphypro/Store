import React from 'react'
import { LessonType, ModuleType } from '../../types/CourseTypes'
import { Box, List, ListItem } from '@mui/material'
import SyllabusViewLesson from '../../components/SyllabusViewLesson'
import SyllabusViewModule from '../../components/SyllabusViewModule'
import { useAppSelector } from '../../hook'
import Header from '../../components/Header'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

export const EditLesson = () => {

  const modules = useAppSelector(state => state.courseReducer.actualModules);
  const lessons = useAppSelector(state => state.courseReducer.actualLessons);


  return (
    <>
      <Header />
      <Box sx={{
        display: 'flex'
      }}>
        <Box sx={{
          width: '20vw',
          border: '1px solid red'
        }}>
          <List sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            w: 1,
          }}>
            {
              modules.map(module_ => {
                return (
                  <ListItem key={uuidv4()} sx={{
                    mb: 3, w: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                    <SyllabusViewModule module_={module_} />
                    <List sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexGrow: 2,
                      border: '0px solid blue',
                      minWidth: '100%'
                    }}>
                      {
                        lessons.map(lesson => {
                          if (module_.code === lesson.code) {
                            return (
                              <ListItem  key={uuidv4()} sx={{
                                flexGrow: 4,
                                "&:hover": {
                                  boxShadow: "2px 2px 2px grey"
                                }
                              }}>
                                <Link to={`../../../edit-lesson/${lesson.id}/step/1`}>
                                  <SyllabusViewLesson lesson={lesson} />
                                </Link>
                              </ListItem>
                            )
                          }
                        })
                      }
                    </List>
                  </ListItem>
                )
              })
            }
          </List>
        </Box>
        <Box sx={{
          width: '80vw',
          border: '1px solid blue'
        }}>
          lol
        </Box>
      </Box>
    </>
  )
}
