import { Box, Paper, Typography } from "@mui/material";
import { ModuleType } from "../types/CourseTypes";

export default function SyllabusViewModule({ module_ }: { module_: ModuleType }) {
  return (
    <Paper sx={{ width:'100%', height: '7vh', display: 'flex', alignItems: 'center'}}>
      <Typography sx={{display:'flex', fontSize: '20px', pl: 2}}>
         <span style={{color: '#999', marginRight: '8px'}}>{module_.moduleNumber}.</span>
         {module_.title}
      </Typography>
    </Paper>
  )
}
