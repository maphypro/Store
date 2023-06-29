import { Box, FormControl, IconButton, Menu, MenuItem, Paper, TextField } from "@mui/material";
import { ModuleType } from "../types/CourseTypes";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../hook";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { changeModule, deleteModule, initializeModulesForExchange } from "../store/Course/courseSlice";

export default function SyllabusEditModule({ module_, courseId }: { module_: ModuleType, courseId: number }) {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const dispatch = useAppDispatch()


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleCLickDeleteButton = () => {
        setAnchorEl(null);
        dispatch(deleteModule({
            client_id: module_.code,
            modulesNumber: module_.modulesNumber
        }))
    }

    return (
        <Paper sx={{ display: 'flex', flexDirection: 'row', minWidth: '100%', p: 2 }}>
            <Box sx={{ h: 1, mr: 2, }}>
                {module_.modulesNumber}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControl sx={{ minWidth: '300px', mb: 3, flexGrow: 1, display: 'flex' }}>
                        <TextField
                            variant='outlined'
                            label="Название модуля"
                            value={module_.name}
                            onChange={e => {
                                dispatch(changeModule({
                                    client_id: module_.code,
                                    title: e.target.value,
                                    description: null,
                                    modulesNumber: module_.modulesNumber
                                }))
                            }}
                        >
                        </TextField>
                    </FormControl>
                    <Box>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu

                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleCLickDeleteButton}>
                            Удалить
                        </MenuItem>
                    </Menu>
                </Box>

                </Box>
                <FormControl sx={{ minWidth: '300px' }}>
                    <TextField
                        variant='outlined'
                        label="Дополнительное описание"
                        value={module_.description}
                        onChange={e => {
                            dispatch(changeModule({
                                client_id: module_.code,
                                title:  null,
                                description: e.target.value,
                                modulesNumber: module_.modulesNumber
                            }))
                        }}
                    >
                    </TextField>
                </FormControl>
            </Box>
        </Paper>
    )
}

