import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const Lessons = () => {
    return (
        <Container maxWidth='lg' sx={{ border: "1px solid red", display: 'flex' }}>
            <Box sx={{border: '1px solid black'}}>
                Aside
            </Box>
            <Box>
                <Outlet />
            </Box>
        </Container>
    );
};


export default Lessons;