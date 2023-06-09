import { Box, Button, Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Link, Navigate, Outlet } from "react-router-dom";
import image from '../../images/header-img-evening.png'
import DraftsIcon from '@mui/icons-material/Drafts';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Header from "../../components/Header";

const Teach = () => {
    return (
        <>
            <Header />
            <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Navigate to="courses" replace />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={image} alt="Image" />
                <Link to='courses/new' >
                    <Button sx={{ mt:4, pl: 2, pr: 2, textTransform: 'inherit', border: '1px solid green', borderRadius: '5px', color: 'green', textDecoration: 'none' }}>
                        <Typography variant="body1">
                            + Новый курс
                        </Typography>
                    </Button>
                </Link>
                <List>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <MenuBookIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Курсы
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <InsertDriveFileOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Уроки
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <EmailOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Рассылки
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
            <Box sx={{flexGrow: 1, ml: 4}}>
                <Outlet />
            </Box>
        </Container>
        </>
    );
};

export default Teach;