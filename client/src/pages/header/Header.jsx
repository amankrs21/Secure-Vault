import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import {
    AppBar, Toolbar, Collapse, Typography, Container, Button, Tooltip, MenuItem,
    IconButton, Menu, Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
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
        if (setting === 'logout') setOpenLogout(true);
    };


    return (
        <AppBar position="fixed">
            {openLogout && <LogoutPop openLogout={openLogout} setOpenLogout={setOpenLogout} />}
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Tooltip arrow title="Secure Vault Application" placement="bottom">
                        <Avatar variant="square" alt="header-icon" src="header-icon.png" sx={{ display: { xs: 'none', md: 'flex' } }} />
                    </Tooltip>
                    <Typography noWrap variant="h5" fontWeight={600} sx={{ display: { xs: 'none', md: 'flex' } }}>
                        &nbsp;Secure Vault
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} ml={3}>
                        <Tooltip arrow title="Home Page" placement="bottom">
                            <MenuItem onClick={() => navigate('/home')} className={isActive('home') ? "active-route" : "non-active-route"}>
                                <HomeIcon />&nbsp;<Typography variant="body1">Home</Typography>
                            </MenuItem>
                        </Tooltip>
                        <Tooltip arrow title="Your Password Vault" placement="bottom">
                            <MenuItem onClick={() => navigate('/vault')} className={isActive('vault') ? "active-route" : "non-active-route"}>
                                <EnhancedEncryptionIcon />&nbsp;<Typography variant="body1">Vault</Typography>
                            </MenuItem>
                        </Tooltip>
                        <Tooltip arrow title="Your Personal Journal" placement="bottom">
                            <MenuItem onClick={() => navigate('/journal')} className={isActive('journal') ? "active-route" : "non-active-route"}>
                                <DescriptionIcon />&nbsp;<Typography variant="body1">Journal</Typography>
                            </MenuItem>
                        </Tooltip>
                        <Tooltip arrow title="Your Account Details" placement="bottom">
                            <MenuItem onClick={() => navigate('/account')} className={isActive('account') ? "active-route" : "non-active-route"}>
                                <PersonIcon />&nbsp;<Typography variant="body1">MyAccount</Typography>
                            </MenuItem>
                        </Tooltip>
                        <Tooltip arrow title="Connect with Developer" placement="bottom">
                            <MenuItem onClick={() => navigate('/collaborate')} className={isActive('collaborate') ? "active-route" : "non-active-route"}>
                                <ConnectWithoutContactIcon />&nbsp;<Typography variant="body1">Collaborate</Typography>
                            </MenuItem>
                        </Tooltip>
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

                    <Avatar variant="square" alt="header-icon" src="header-icon.png" sx={{ display: { xs: 'flex', md: 'none' } }} />
                    <Typography noWrap variant="h5" sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
                        &nbsp;Secure Vault
                    </Typography>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip arrow title="Logout User" placement="bottom">
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
                            <MenuItem onClick={() => handleCloseUserMenu("logout")}>
                                <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                            </MenuItem>
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
