import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import {
    AppBar, Toolbar, Collapse, Typography, Container, Button, Tooltip, MenuItem,
    IconButton, Menu, Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';


import './Header.css';
import { useAuth } from '../hooks/useAuth';
import LogoutPop from '../components/LogoutPop';


// Header component
export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userData } = useAuth();
    const [open, setOpen] = useState(false);
    const [popUser, setPopUser] = useState(null);
    const [openLogout, setOpenLogout] = useState(false);

    const isActive = (page) => location.pathname.split('/')[1] === page;

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
                <Toolbar disableGutters variant="dense">
                    <Tooltip arrow placement="bottom" title="Click to refresh">
                        <Avatar
                            src="/header-icon.png"
                            variant="square"
                            alt="header-icon"
                            onClick={() => { window.location.reload() }}
                            sx={{ display: { xs: 'none', md: 'flex', cursor: 'pointer' } }}
                        />
                    </Tooltip>
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
                        <MenuItem onClick={() => navigate('/account')} className={isActive('account') ? "active-route" : "non-active-route"}>
                            <AccountCircleIcon />&nbsp;<Typography variant="body1">Account</Typography>
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

                    <Avatar variant="square" alt="header-icon" src="/header-icon.png" sx={{ display: { xs: 'flex', md: 'none' } }} />
                    <Typography noWrap variant="h5" sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
                        &nbsp;Secure Vault
                    </Typography>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip arrow placement="bottom" title="Click to logout">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={userData?.name} src={`https://robohash.org/${userData?.name}`} className='profileAvt' />
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
                                <Typography sx={{ display: 'flex', textAlign: 'center', fontWeight: 600 }}>
                                    Logout &nbsp; <LogoutIcon color='secondary' />
                                </Typography>
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
                        <MenuItem onClick={() => toggleDrawer('account')} className={isActive('account') ? "pop-active" : "pop-non-active"}>
                            <AccountCircleIcon />&nbsp;<Typography variant="body1" fontWeight={800}>Account</Typography>
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
