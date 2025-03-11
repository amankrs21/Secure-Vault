import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';


// Logout confirmation dialog
export default function LogoutPop({ openLogout, setOpenLogout }) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
        setOpenLogout(false);
        toast.success('Logout successful');
    }

    return (
        <Dialog
            fullWidth
            maxWidth='xs'
            open={openLogout}
            onClose={() => setOpenLogout(false)}
        >
            <DialogTitle>
                {"Confirm Logout?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to logout?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={() => setOpenLogout(false)}>No</Button>
                <Button variant='contained' onClick={handleLogout}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

LogoutPop.propTypes = {
    openLogout: PropTypes.bool.isRequired,
    setOpenLogout: PropTypes.func.isRequired,
}
