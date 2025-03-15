import PropTypes from 'prop-types';
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';


// Component that handles the deletion of a journal
export default function JournalDelete({ deleteData, setDeleteData, data }) {

    const handleCancel = () => {
        setDeleteData(null);
    }

    const handleDelete = () => {
        data(deleteData);
    }

    return (
        <Dialog fullWidth maxWidth="xs" open={deleteData !== null} onClose={handleCancel}>
            <DialogTitle>
                Confirm Delete?
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this journal? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={handleCancel}>
                    No
                </Button>
                <Button color='error' variant='contained' onClick={handleDelete}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

JournalDelete.propTypes = {
    deleteData: PropTypes.string.isRequired,
    setDeleteData: PropTypes.func.isRequired,
    data: PropTypes.func.isRequired
}
