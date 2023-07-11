import { Box, Paper, Typography } from "@mui/material";
import { LessonType } from "../types/CourseTypes";

export default function SyllabusViewLesson({ lesson }: { lesson: LessonType }) {
  return (
    <Paper sx={{ width:'100%', height: '7vh', display: 'flex', alignItems: 'center'}}>
      <Typography sx={{display:'flex', fontSize: '20px', pl: 2}}>
         <span style={{color: '#999', marginRight: '8px'}}>{lesson.lessonNumber}.</span>
         {lesson.title}
      </Typography>
    </Paper>
  )
}
