import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button
} from '@mui/material';

export default function AddVault({ openAdd, setOpenAdd, data }) {
    const [errors, setErrors] = useState({});

    const securityPin = localStorage.getItem('SecurityPin') ? localStorage.getItem('SecurityPin') : false;

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
                    if (!securityPin && formJson.key.length < 6) {
                        setErrors({ key: "PIN should be atleast 8 characters long!" });
                        return;
                    }
                    if (formJson.key) {
                        formJson.key = btoa(formJson.key);
                    } else {
                        formJson.key = localStorage.getItem('SecurityPin');
                    }
                    data(formJson);
                    setOpenAdd(!openAdd);
                },
            }}
        >
            <DialogTitle>Add a new Password</DialogTitle>
            <DialogContent>
                <DialogContentText mb={2}>
                    Please fill the form to add a new password.
                    {!securityPin && <b style={{ color: 'red' }}><br />
                        Please note that the PIN will be used every where to encrypt and decrypt the password.
                    </b>}
                </DialogContentText>
                <TextField autoFocus fullWidth required variant="outlined" name="title"
                    label="Title (Website Name)" />
                <TextField fullWidth variant="outlined" sx={{ marginY: 2 }}
                    name="username" label="Username (optional)" />
                <TextField autoFocus fullWidth required variant="outlined"
                    name="password" label="Password" />
                {!securityPin && <TextField fullWidth variant="outlined" name="key" sx={{ marginTop: 2 }}
                    label="PIN to encrypt Password" error={!!errors.key} helperText={errors.key} />}
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
