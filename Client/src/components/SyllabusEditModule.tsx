import { Box, FormControl, Paper, TextField } from "@mui/material";
import { ModuleType } from "../types/CourseTypes";
import { useState } from "react";
import { useAppDispatch } from "../hook";
import { changeModule } from "../store/Course/courseSlice";

export default function SyllabusEditModule({ module_, courseId }: { module_: ModuleType, courseId: number }) {

    const [title, setTitle] = useState(module_.name)

    const [description, setDescription] = useState(module_.description)

    const dispatch = useAppDispatch()



    return (
        <Paper sx={{ display: 'flex', flexDirection: 'row', minWidth: '100%', p: 2 }}>
            <Box sx={{ h: 1, mr: 2, }}>
                {module_.modulesNumber}
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                <FormControl sx={{ minWidth: '300px', mb: 3 }}>
                    <TextField
                        variant='outlined'
                        label="Название модуля"
                        value={title}
                        onChange={e => {
                            setTitle(e.target.value);
                            dispatch(changeModule({
                                courseId: courseId,
                                moduleNumber: module_.modulesNumber,
                                title: e.target.value,
                                description: description ? description : ' '
                            }))
                        }}
                    >
                    </TextField>
                </FormControl>
                <FormControl sx={{ minWidth: '300px' }}>
                    <TextField
                        variant='outlined'
                        label="Дополнительное описание"
                        value={description}
                        onChange={e => {
                            setDescription(e.target.value);
                            dispatch(changeModule({
                                courseId: courseId,
                                moduleNumber: module_.modulesNumber,
                                title: title ? title : '',
                                description: e.target.value
                            }))
                        }}
                    >
                    </TextField>
                </FormControl>
            </Box>
        </Paper>
    )
}
