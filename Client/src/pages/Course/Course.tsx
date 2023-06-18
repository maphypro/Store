import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import { Box, Button, Collapse, Container, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from '@mui/material';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { useEffect, useState } from 'react';
import { Outlet, useOutletContext, useParams } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Header from '../../components/Header';
import { CourseType } from '../../types/CourseTypes';
import { useAppSelector } from '../../hook';


const Course = () => {


    const [open, setOpen] = useState(true);

    const { id } = useParams();
    let course_id: number = id ? +id : -1

    const courses = useAppSelector(state => state.courseReducer.ownerCourses)

    const [activeCourse, setActiveCourse] = useState<CourseType | undefined>();

    //const activeCourse = courses.find(course => course.id === id)

    useEffect(() => {
        setActiveCourse(courses.find(course => course.id === course_id))
        console.log(activeCourse)

    })


    
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <Header />
            <Container sx={{ display: 'flex' }}>
                <Box sx={{ maxWidth: .2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Box>
                        {activeCourse?.id}
                    </Box>
                    <Box>{activeCourse?.title}</Box>

                    <Button sx={{ my: 3, pl: 2, pr: 2, textTransform: 'inherit', border: '1px solid green', borderRadius: '5px', color: 'green', textDecoration: 'none' }}>
                        <Typography variant="body1">
                            Опубликовать
                        </Typography>
                    </Button>
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                    >

                        <ListItemButton onClick={handleClick}>
                            <ListItemIcon>
                                <MenuBookIcon />
                            </ListItemIcon>
                            <ListItemText primary="Курс" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}>

                                    <ListItemText primary="Описание" />
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemText primary="Содержание" />
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemText primary="Чек-лист" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </List>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Outlet />
                </Box>
            </Container>
        </>
    );
};

export default Course;