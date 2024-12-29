import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import {
    AppBar, Toolbar, Collapse, Typography, Container, Button, Tooltip, MenuItem,
    IconButton, Menu, Avatar
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

import './Header.css';
import LogoutPop from './LogoutPop';
import AuthProvider from '../../middleware/AuthProvider';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userName } = AuthProvider();
    const [open, setOpen] = useState(false);
    const [popUser, setPopUser] = useState(null);
    const [openLogout, setOpenLogout] = useState(false);

    const settings = ['Account', 'Logout'];
    const isActive = (page) => location.pathname === '/' + page;

    const toggleDrawer = (page) => {
        setOpen(!open);
        if (page) {
            navigate('/' + page);
        }
    };

    const handleOpenUserMenu = (event) => {
        setPopUser(event.currentTarget);
    };

    const handleCloseUserMenu = (setting) => {
        setPopUser(null);
        console.log("====>", setting);
        if (setting === 'Account') navigate('/account');
        else if (setting === 'Logout') setOpenLogout(true);
    };

    return (
        <AppBar position="fixed">
            {openLogout && <LogoutPop openLogout={openLogout} setOpenLogout={setOpenLogout} />}
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' } }} />
                    <Typography noWrap variant="h6" sx={{ display: { xs: 'none', md: 'flex' } }}>
                        &nbsp;Secure Vault
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} ml={3}>
                        <MenuItem onClick={() => navigate('/home')} className={isActive('home') ? "active-route" : "non-active-route"}>
                            <HomeIcon />&nbsp;<Typography variant="body1">Home</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/vault')} className={isActive('vault') ? "active-route" : "non-active-route"}>
                            <EnhancedEncryptionIcon />&nbsp;<Typography variant="body1">Vault</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/journal')} className={isActive('journal') ? "active-route" : "non-active-route"}>
                            <DescriptionIcon />&nbsp;<Typography variant="body1">Journal</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/collaborate')} className={isActive('collaborate') ? "active-route" : "non-active-route"}>
                            <ConnectWithoutContactIcon />&nbsp;<Typography variant="body1">Collaborate</Typography>
                        </MenuItem>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <Button
                            variant="outlined"
                            onClick={() => toggleDrawer()}
                            sx={{ minWidth: '30px', p: '4px' }}
                        >
                            {!open ? <MenuIcon sx={{ color: 'white' }} /> : <CloseIcon sx={{ color: 'white' }} />}
                        </Button>
                    </Box>

                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' } }} />
                    <Typography noWrap variant="h5" sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
                        &nbsp;Secure Vault
                    </Typography>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={userName} src={`https://robohash.org/${userName}`} className='profileAvt' />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={popUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(popUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                </Toolbar>
                <Collapse in={open}>
                    <Box
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            bgcolor: 'rgba(241, 241, 241, 0.9)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '20px',
                            textAlign: 'center',
                            p: 2,
                            mb: 2,
                        }}
                    >
                        <MenuItem onClick={() => toggleDrawer('home')} className={isActive('home') ? "pop-active" : "pop-non-active"}>
                            <HomeIcon />&nbsp;<Typography variant="body1" fontWeight={800}>Home</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => toggleDrawer('vault')} className={isActive('vault') ? "pop-active" : "pop-non-active"}>
                            <EnhancedEncryptionIcon />&nbsp;<Typography variant="body1" fontWeight={800}>Vault</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => toggleDrawer('journal')} className={isActive('journal') ? "pop-active" : "pop-non-active"}>
                            <DescriptionIcon />&nbsp;<Typography variant="body1" fontWeight={800}>Journal</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => toggleDrawer('collaborate')} className={isActive('collaborate') ? "pop-active" : "pop-non-active"}>
                            <ConnectWithoutContactIcon />&nbsp;<Typography variant="body1" fontWeight={800}>Collaborate</Typography>
                        </MenuItem>
                    </Box>
                </Collapse>
            </Container>
        </AppBar>
    );
}
