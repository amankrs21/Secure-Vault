import PropTypes from 'prop-types';
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';

export default function DeleteNote({ deleteData, setDeleteData, data }) {

    const handleCancel = () => {
        setDeleteData(null);
    }

    const handleDelete = () => {
        data(deleteData);
        setDeleteData(null);
    }

    return (
        <Dialog fullWidth maxWidth="xs" open={deleteData !== null} onClose={handleCancel}>
            <DialogTitle>
                {"Confirm Delete?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this note? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={handleCancel}>No</Button>
                <Button variant='contained' onClick={handleDelete}>Delete</Button>
            </DialogActions>
        </Dialog>
    )
}

DeleteNote.propTypes = {
    deleteData: PropTypes.string.isRequired,
    setDeleteData: PropTypes.func.isRequired,
    data: PropTypes.func.isRequired
}
