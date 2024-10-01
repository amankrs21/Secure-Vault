import './Header.css';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import {
    AppBar, Toolbar, Collapse, Typography, Container, Button, Tooltip, MenuItem
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import DescriptionIcon from '@mui/icons-material/Description';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';


export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const toggleDrawer = (page) => {
        setOpen(!open);
        if (page) {
            navigate('/' + page);
        }
    };

    const isActive = (page) => location.pathname === '/' + page;


    return (
        <AppBar position="fixed">
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
                        <MenuItem onClick={() => navigate('/notes')} className={isActive('notes') ? "active-route" : "non-active-route"}>
                            <DescriptionIcon />&nbsp;<Typography variant="body1">Notes</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/connect')} className={isActive('connect') ? "active-route" : "non-active-route"}>
                            <ConnectWithoutContactIcon />&nbsp;<Typography variant="body1">Connect</Typography>
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
                        <Tooltip title="Logout User!!">
                            <Button variant="contained" color="warning" className='logout-button' sx={{ minWidth: '40px', padding: '8px' }}
                                onClick={() => localStorage.clear()}>
                                <LogoutIcon fontSize='small' />
                            </Button>
                        </Tooltip>
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
                        <MenuItem onClick={() => toggleDrawer('notes')} className={isActive('notes') ? "pop-active" : "pop-non-active"}>
                            <DescriptionIcon />&nbsp;<Typography variant="body1" fontWeight={800}>Notes</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => toggleDrawer('connect')} className={isActive('connect') ? "pop-active" : "pop-non-active"}>
                            <ConnectWithoutContactIcon />&nbsp;<Typography variant="body1" fontWeight={800}>Connect</Typography>
                        </MenuItem>
                    </Box>
                </Collapse>
            </Container>
        </AppBar>
    );
}
