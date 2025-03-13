import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';

import { useAuth } from '../../hooks/useAuth';
import { useLoading } from '../../hooks/useLoading';


// Component to delete user account
export default function AccountDelete({ openDelete, setOpenDelete }) {
    const { http, logout } = useAuth();
    const { setLoading } = useLoading();

    const handleDeleteUser = async () => {
        try {
            setLoading(true);
            await http.delete('/user/delete');
            toast.success("Account deleted successfully");
            setOpenDelete(false);
            logout();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete account");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog
            fullWidth
            maxWidth='xs'
            open={openDelete}
            onClose={() => setOpenDelete(false)}
        >
            <DialogTitle>
                {"Confirm Delete?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <b style={{ color: 'red' }}>Are you sure want to delete your account...?? <br />
                        All your data will be lost permanently and cannot be recovered.
                    </b>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={() => setOpenDelete(false)}>No</Button>
                <Button variant='contained' color='error' onClick={handleDeleteUser}>
                    Yes, Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

AccountDelete.propTypes = {
    openDelete: PropTypes.bool.isRequired,
    setOpenDelete: PropTypes.func.isRequired,
}
