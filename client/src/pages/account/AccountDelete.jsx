import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import AuthProvider from '../../middleware/AuthProvider';
import { useLoading } from '../../components/loading/useLoading';

export default function AccountDelete({ openDelete, setOpenDelete }) {
    const navigate = useNavigate();
    const { http } = AuthProvider();
    const { setLoading } = useLoading();

    const handleDeleteUser = async () => {
        try {
            setLoading(true);
            await http.delete('/auth/user/delete');
            setOpenDelete(false);
            toast.success("Account deleted successfully");
            localStorage.clear();
            navigate('/login');
            navigate('/login');
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
