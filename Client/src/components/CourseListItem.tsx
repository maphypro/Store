import { Box, IconButton, Menu, MenuItem, Paper, Typography } from "@mui/material";
import { CourseType } from "../types/CourseTypes";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import course_logo_default from '../images/course_logo.png'
import { Link } from "react-router-dom";

export default function CourseListItem({ course }: { course: CourseType }) {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const course_logo: string = course.image || course_logo_default;


    return (
        <Link to={`/course/${course.id}/syllabus`} style={{textDecoration: 'none'}}>
            <Paper sx={{ display: 'flex', justifyContent: 'space-between', p: 1, "&:hover": { boxShadow: 6 } }}>

                <Box sx={{ display: 'flex' }}>
                    <img src={course_logo} alt="course_logo" style={{ width: '65px' }} />
                    <Typography variant="h6" sx={{ ml: 2 }}>
                        {course.title}
                    </Typography>
                </Box>

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
                        <MenuItem onClick={handleClose}>
                            Редактировать
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            Удалить
                        </MenuItem>
                    </Menu>
                </Box>
            </Paper>
        </Link>
    )
}
