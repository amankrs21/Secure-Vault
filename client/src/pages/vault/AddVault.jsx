import PropTypes from 'prop-types';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button
} from '@mui/material';

export default function AddVault({ openAdd, setOpenAdd, data }) {

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
                    Please fill the form to add a new password.
                </DialogContentText>
                <TextField autoFocus fullWidth required variant="outlined" name="title"
                    label="Title (Website Name)" />
                <TextField fullWidth variant="outlined" sx={{ marginY: 2 }}
                    name="username" label="Username (optional)" />
                <TextField fullWidth required variant="outlined"
                    name="password" label="Password" />
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={() => setOpenAdd(!openAdd)}>Cancel</Button>
                <Button type="submit" variant='contained'>Add</Button>
            </DialogActions>
        </Dialog>
    )
}

AddVault.propTypes = {
    openAdd: PropTypes.bool.isRequired,
    setOpenAdd: PropTypes.func.isRequired,
    data: PropTypes.func.isRequired
};
