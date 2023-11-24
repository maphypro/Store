import { Box, Button, Container, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Link, Navigate, Outlet } from "react-router-dom";
import image from '../../images/header-img-evening.png'
import DraftsIcon from '@mui/icons-material/Drafts';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Header from "../../components/Header";
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { useEffect } from "react";


const TypographyStyleMd = {
    fontSize: '12px'
}

const Teach = () => {

    return (
        <>
            <Header />
            <Container sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', md: 'row' }, padding: { xs: 0.5 } }}>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column' }}>
                        <Box>
                            <img src={image} alt="Image" />
                        </Box>
                        <Link to='courses/new' >
                            <Button sx={{ mt: 4, pl: 2, pr: 2, textTransform: 'inherit', border: '1px solid green', borderRadius: '5px', color: 'green', textDecoration: 'none' }}>
                                <Typography variant="body1">
                                    + Новый курс
                                </Typography>
                            </Button>
                        </Link>
                    </Box>
                    <List sx={{ display: { xs: 'none', md: 'block' } }}>
                        <ListItem>
                            <Link to={"/teach/courses"} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <MenuBookIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Курсы
                                    </ListItemText>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to={"/teach/lessons"} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <InsertDriveFileOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Уроки
                                    </ListItemText>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link to={"/teach/mailing"}
                                style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <EmailOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Рассылки
                                    </ListItemText>
                                </ListItemButton>
                            </Link>
                        </ListItem>

                        <Divider style={{ width: '100%' }} />
                        <ListItem>
                            <Link to={"lessons/new"}
                                style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AddSharpIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Новый урок
                                    </ListItemText>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    </List>
                    <List sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, py: 0, w: '100%', }}>
                        <ListItem sx={{p: 0}}>
                            <Link to={"/teach/courses"} style={{ textDecoration: 'none', color: 'inherit', width: '100%', padding: 0 }}>
                                <ListItemButton sx={{py: 0}}>
                                    <ListItemText >
                                        <Typography variant="body2" style={{ fontSize: '14px' }}>
                                            Курсы
                                        </Typography>
                                    </ListItemText>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem sx={{p: 0}}>
                            <Link to={"/teach/lessons"} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                <ListItemButton sx={{py: 0}}>
                                    <ListItemText sx={TypographyStyleMd}>
                                        <Typography variant="body2" style={{ fontSize: '14px' }}>
                                            Уроки
                                        </Typography>
                                    </ListItemText>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem sx={{p: 0}}>
                            <Link to={"/teach/mailing"}
                                style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                <ListItemButton sx={{py: 0}}>
                                    <ListItemText>
                                        <Typography variant="body2" style={{ fontSize: '14px' }}>
                                            Рассылки
                                        </Typography>
                                    </ListItemText>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    </List>
                    <Divider sx={{ width: '100%', h: '10px', mt: 1 }} />

                </Box>
                <Box sx={{ flexGrow: 1, ml: { xs: 0, md: 4 } }}>
                    <Outlet />
                </Box>
            </Container >
        </>
    );
};

export default Teach;