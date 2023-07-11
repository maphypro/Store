import { Paper, Box, FormControl, TextField, IconButton, Menu, MenuItem, Button, Typography } from "@mui/material";
import { changeLesson, changeModule, createNewLesson, deleteLesson } from "../store/Course/courseSlice";
import { LessonType } from "../types/CourseTypes";
import { useAppDispatch } from "../hook";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState } from "react";
import { Link } from "react-router-dom";


export default function SyllabusEditLesson({ lesson, courseId, status, code }: { lesson: LessonType | null, courseId: number, status: string, code: number }) {

  const [title, setTitle] = useState('')

  const dispatch = useAppDispatch()

  const handleCreateLesson = () => {
    dispatch(createNewLesson({ title: title, code: code }))
    setTitle('');
  }

  const handleDeleteLesson = (lessonNumber: number) => () => {
    dispatch(deleteLesson({ lessonNumber }))
  }

  if (status === 'NEW') {
    return (
      <Paper sx={{ display: 'flex', flexDirection: 'row', ml: 8, flexGrow: 1, p: 2 }}>

        <Box sx={{ border: '0px solid green', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
          <Box sx={{ border: '0px solid pink', display: 'flex', flexDirection: 'row', flexGrow: 1, mr: 2, alignItems: 'center' }}>
            <FormControl sx={{ minWidth: '300px', flexGrow: 1, display: 'flex' }}>
              <TextField
                variant='outlined'
                label="Название урока"
                value={title}
                onChange={e => setTitle(e.target.value)}
              >
              </TextField>
            </FormControl>
          </Box>
          <Button
            onClick={handleCreateLesson}
            sx={{
              pl: 2,
              pr: 2,
              py: 1,
              mr: 2,
              textTransform: 'inherit',
              border: '1px solid green',
              borderRadius: '5px',
              color: 'green',
              textDecoration: 'none'
            }}>
            <Typography variant="body1">
              Создать урок
            </Typography>
          </Button>
          <Box sx={{ border: '0px solid red' }}>
            <IconButton
              aria-label="more"
              id="long-button"
            //onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper >
    )
  }

  return (
    <Paper sx={{ display: 'flex', flexDirection: 'row', minWidth: '100%', p: 2 }}>
      <Box sx={{ h: 1, mr: 2, }}>
        {lesson?.lessonNumber}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <FormControl sx={{ minWidth: '300px', mb: 3, flexGrow: 1, display: 'flex' }}>
            <TextField
              variant='outlined'
              label="Название урока"
              value={lesson?.title}
              onChange={e => {
                dispatch(changeLesson({
                  lessonNumber: lesson ? lesson.lessonNumber : -1,
                  title: e.target.value,
                }))
              }}
            >
            </TextField>
          </FormControl>
          {
            status === 'SAVED' ?
              <Box sx={{ml: 2}}>
                <Link to='/d'>
                  <Button
                    onClick={handleCreateLesson}
                    sx={{
                      pl: 2,
                      pr: 2,
                      py: 1,
                      mr: 2,
                      textTransform: 'inherit',
                      border: '1px solid green',
                      borderRadius: '5px',
                      color: 'green',
                      textDecoration: 'none'
                    }}>
                    <Typography variant="body1">
                      Редактировать
                    </Typography>
                  </Button>
                </Link>
              </Box> :
              null
          }
          <Box>
            <IconButton
              aria-label="more"
              id="long-button"
              onClick={handleDeleteLesson(lesson?.lessonNumber || -1)}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Box>

        </Box>
      </Box>
    </Paper>
  )
}
