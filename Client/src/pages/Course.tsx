import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import { Box, Button, Collapse, Container, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from '@mui/material';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { useState } from 'react';
import { Outlet, useOutletContext, useParams } from 'react-router-dom';

type CourseTypeProps = {
    id: number,
    title: string
}

const Course = () => {


    const [open, setOpen] = useState(true);

    const {id} = useParams();




    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Container>
            <Box sx={{ maxWidth: .2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start'  }}>
                <Box>
                    {id}
                </Box>
                <Box>{/*title*/}</Box>

                <Button sx={{ my: 3, pl: 2, pr: 2, textTransform: 'inherit', border: '1px solid green', borderRadius: '5px', color: 'green', textDecoration: 'none' }}>
                    <Typography variant="body1">
                        + Новый курс
                    </Typography>
                </Button>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <AddSharpIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sent mail" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <AddSharpIcon />
                        </ListItemIcon>
                        <ListItemText primary="Drafts" />
                    </ListItemButton>
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <AddSharpIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inbox" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Starred" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </Box>
            <Box>
                <Outlet /> 
            </Box>
        </Container>
    );
};

export default Course;