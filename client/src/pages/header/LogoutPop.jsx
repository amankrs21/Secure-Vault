import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function LogoutPop({ openLogout, setOpenLogout }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        toast.success('Logout successful');
        setOpenLogout(false);
        localStorage.clear();
        navigate('/login');
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
