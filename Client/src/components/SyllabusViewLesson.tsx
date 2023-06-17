import { Box } from "@mui/material";
import { LessonType } from "../types/CourseTypes";

export default function SyllabusViewLesson({ lesson }: { lesson: LessonType }) {
  return (
    <Box>
      {lesson.title}
    </Box>
  )
}
