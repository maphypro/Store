import { Box, Paper, Typography } from "@mui/material";
import { ModuleType } from "../types/CourseTypes";

export default function SyllabusViewModule({ module_ }: { module_: ModuleType }) {
  return (
    <Paper>
      <Typography sx={{display:'flex'}}>
         <span style={{color: '#EEE', marginRight: '8px'}}>{module_.id}.</span>{module_.title}
      </Typography>
    </Paper>
  )
}
