import PropTypes from 'prop-types';
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';

export default function DeleteVault({ deleteData, setDeleteData, data }) {
    const handleDelete = () => {
        data(deleteData);
        setDeleteData(null);
    }

    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={deleteData !== null}
            onClose={() => setDeleteData(null)}
        >
            <DialogTitle>
                {"Confirm Delete?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this vault? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={() => setDeleteData(null)}>No</Button>
                <Button variant='contained' onClick={handleDelete}>Delete</Button>
            </DialogActions>
        </Dialog>
    )
}
DeleteVault.propTypes = {
    deleteData: PropTypes.bool.isRequired,
    setDeleteData: PropTypes.func.isRequired,
    data: PropTypes.func.isRequired
}
