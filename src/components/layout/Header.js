import React, { useState } from 'react';
import { Button, AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Tooltip, MenuItem } from '@mui/material';
import { MenuOutlined, Stars, AutoAwesome } from '@mui/icons-material';
import logo from './../../logo/logo.png';

const Header = (props) => {
    const [anchorElLeft, setAnchorElLeft] = useState(null);
    const [anchorElRight, setAnchorElRight] = useState(null);
    const { isAdmin } = props;
    const leftOption = ['Upload'];
    const rightOption = ['User', 'About'];

    if (isAdmin) {
        leftOption.push("Extract");
        leftOption.push("Delete");
    }

    const setPage = (page) => {
        props.setPage(page);
        handleCloseRightMenu();
        handleCloseLeftMenu();
    };

    const handleCloseLeftMenu = () => {
        setAnchorElLeft(null);
    };

    const handleCloseRightMenu = () => {
        setAnchorElRight(null);
    };

    const handleOpenLeftMenu = (event) => {
        setAnchorElLeft(event.currentTarget);
    };

    const handleOpenRightMenu = (event) => {
        setAnchorElRight(event.currentTarget);
    };

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: "#005b96" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            <img className="pointer" src={logo} alt="star logo" height="50px" onClick={() => setPage("Gallery")} />
                            <AutoAwesome />
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="current page"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenLeftMenu}
                                color="inherit"
                            >
                                <MenuOutlined />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElLeft}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElLeft)}
                                onClose={handleCloseLeftMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {leftOption.map((option, index) => (
                                    <MenuItem key={`f-${option}-${index}`} onClick={() => { setPage(option); }}>
                                        <Typography textAlign="center">{option}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            <img className="pointer" src={logo} alt="star logo" height="50px" onClick={() => setPage("Gallery")} />
                            <AutoAwesome />
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {leftOption.map((option, index) => (
                                <Button
                                    key={`f2-${option}-${index}`}
                                    onClick={() => { setPage(option) }}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {option}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }} >
                            <Tooltip title="More">
                                <Typography onClick={handleOpenRightMenu} sx={{ p: 0 }}>
                                    <Stars className="pointer" fontSize="large" />
                                </Typography>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElRight}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElRight)}
                                onClose={handleCloseRightMenu}
                            >
                                {rightOption.map((page, index) => (
                                    <MenuItem key={`p-${page}-${index}`} onClick={() => { setPage(page) }}>
                                        <Typography textAlign="center" >{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default Header;