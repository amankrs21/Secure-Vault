import PropTypes from 'prop-types';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button
} from '@mui/material';

export default function AddNote({ openAdd, setOpenAdd, data }) {
    return (
        <Dialog
            maxWidth="xs"
            open={openAdd}
            onClose={() => setOpenAdd(!openAdd)}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    data(formJson);
                    setOpenAdd(!openAdd);
                },
            }}
        >
            <DialogTitle>Add a new Password</DialogTitle>
            <DialogContent>
                <DialogContentText mb={2}>
                    Please fill the form to add a new note.
                </DialogContentText>
                <TextField autoFocus fullWidth required variant="outlined" name="title"
                    label="Note Title" />
                <TextField fullWidth multiline variant="outlined" minRows={3} maxRows={4} sx={{ marginY: 2 }}
                    name="content" label="Note Content" />
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={() => setOpenAdd(!openAdd)}>Cancel</Button>
                <Button type="submit" variant='contained'>Add</Button>
            </DialogActions>
        </Dialog>
    )
}

AddNote.propTypes = {
    openAdd: PropTypes.bool.isRequired,
    setOpenAdd: PropTypes.func.isRequired,
    data: PropTypes.func.isRequired
};
