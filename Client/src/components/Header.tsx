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
    padding: '16px 8px',
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
        <AppBar position="static" sx={{ mb: 2 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: 'flex' }}>
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
                        }}
                    >
                        Vodim
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pagesRoutes.map((page) => (
                            <Link to={page.path} style={AuthButtonStyle} >
                                <Button
                                    key={page.name}
                                    onClick={handleCloseNavMenu}
                                    sx={{ color: 'white', display: 'block' }}
                                >
                                    {page.name}
                                </Button>
                            </Link>

                        ))}
                    </Box>


                    <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, mr: 5, bgcolor: 'info.main' }}>
                        <TextField variant='standard' type='search' sx={{ width: "100%" }} />
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
                                <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
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
                                    sx={{ mt: '45px' }}
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
                                                <>
                                                    <Divider />
                                                    <MenuItem key={setting} onClick={handleLogoutClick}>
                                                        <Typography textAlign="center">{setting}</Typography>
                                                    </MenuItem>
                                                </>
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