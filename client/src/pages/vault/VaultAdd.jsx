import PropTypes from 'prop-types';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button
} from '@mui/material';

export default function VaultAdd({ openAdd, setOpenAdd, data }) {

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
                },
            }}
        >
            <DialogTitle>
                Add a new Password
            </DialogTitle>
            <DialogContent>
                <DialogContentText mb={2}>
                    Please fill the form to add a new password.
                </DialogContentText>
                <TextField
                    autoFocus
                    fullWidth
                    required
                    name="title"
                    variant="outlined"
                    label="Title (Website Name)"
                />
                <TextField
                    fullWidth
                    name="username"
                    variant="outlined"
                    label="Username (optional)"
                    sx={{ marginY: 2 }}
                />
                <TextField
                    fullWidth
                    required
                    name="password"
                    label="Password"
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={() => setOpenAdd(!openAdd)}>Cancel</Button>
                <Button type="submit" variant='contained'>Add</Button>
            </DialogActions>
        </Dialog>
    )
}

VaultAdd.propTypes = {
    openAdd: PropTypes.bool.isRequired,
    setOpenAdd: PropTypes.func.isRequired,
    data: PropTypes.func.isRequired
};
