import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CameraIcon from '@mui/icons-material/Camera';
import { Divider, TextField } from "@mui/material";
import { useAppSelector } from '../hook';
import { Link } from 'react-router-dom';
import { useLazyLogoutQuery, useLoginMutation } from '../store/User/userApi';


const pagesRoutes = [
    {
        name: 'Каталог',
        path: '/catalog'
    },
    {
        name: 'Моё обучение',
        path: '/learn'
    },
    {
        name: 'Преподавание',
        path: '/teach/courses'
    }
]

const settings = ['Профиль', 'Настройки', 'Уведомления', 'Выйти'];

const AuthButtonStyle = {
    display: 'block',
    color: 'white',
    textDecoration: 'none'
}



function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogoutClick = () => {
        logout();
        handleCloseUserMenu();
    }


    const [logout, { data, isLoading, error }] = useLazyLogoutQuery()


    const isAuth: boolean = useAppSelector(state => state.userReduces.isAuth)

    return (
        <AppBar position="static" sx={{ mb: 2, height: '50px', display: 'flex', alignItems: 'center' }}>
            <Container maxWidth="xl" sx={{border: '1px solid black', pt: 0, height: '100%'}}>
                <Toolbar variant='dense' disableGutters sx={{ display: 'flex', alignItems: 'center',  m: 0, p: 0}}>
                    <CameraIcon sx={{
                        display: { xs: 'none', md: 'flex' },
                        flexDirection: { xs: 'column', md: 'row' }, mr: 1
                    }} />
                    <Typography
                        variant="h4"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            fontSize: '1.5em'
                        }}
                    >
                        Vodim
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, fontSize: '1em' }}>
                        {pagesRoutes.map((page) => (
                            <Link to={page.path} key={page.name} style={AuthButtonStyle} >
                                <Button
                                    key={page.name}
                                    onClick={handleCloseNavMenu}
                                    sx={{ color: 'white', display: 'block', textTransform: 'none' }}
                                >
                                    {page.name}
                                </Button>
                            </Link>

                        ))}
                    </Box>


                    <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, mr: 5, bgcolor: 'info.main' }}>
                        <TextField variant='standard' type='search' sx={{ width: "100%", height: '100%' }} />
                    </Box>



                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, mr: 2 }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pagesRoutes.map((page) => (
                                <Link to={page.path} key={page.name} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page.name}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none' }, width: 1, mr: 1, bgcolor: 'info.main' }}>
                        <TextField variant='standard' type='search' sx={{ width: 1 }} />
                    </Box>


                    {
                        isAuth ?
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>

                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting, index) => {
                                        if (index === setting.length - 2) {
                                            return (
                                                <Box key={setting}>
                                                    <Divider />
                                                    <MenuItem key={setting} onClick={handleLogoutClick}>
                                                        <Typography textAlign="center">{setting}</Typography>
                                                    </MenuItem>
                                                </Box>
                                            )
                                        }
                                        else {
                                            return (
                                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                                    <Typography textAlign="center">{setting}</Typography>
                                                </MenuItem>
                                            )
                                        }
                                    })}

                                </Menu>
                            </Box>
                            :
                            <Box sx={{ display: 'flex', flexGrow: 0 }}>
                                <Link to="/signin" style={AuthButtonStyle} >
                                    Войти
                                </Link>
                                <Link to="/signup" style={AuthButtonStyle}>Регистрация</Link>
                            </Box>
                    }

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;