import PropTypes from 'prop-types';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button
} from '@mui/material';
import { useState } from 'react';

export default function UpdateVault({ updateData, setUpdateData, data }) {

    const [formValues, setFormValues] = useState({
        id: updateData?._id || '',
        title: updateData?.title || '',
        username: updateData?.username || '',
        password: updateData?.password || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (
        <Dialog
            maxWidth="xs"
            open={updateData !== null}
            onClose={() => setUpdateData(null)}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    data(formValues);
                    setUpdateData(null);
                },
            }}
        >
            <DialogTitle>Update Password</DialogTitle>
            <DialogContent>
                <DialogContentText mb={2}>
                    Please update the form to modify the password.
                </DialogContentText>

                <TextField
                    autoFocus
                    fullWidth
                    required
                    variant="outlined"
                    name="title"
                    label="Title (Website Name)"
                    value={formValues.title}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    variant="outlined"
                    sx={{ marginY: 2 }}
                    name="username"
                    label="Username (optional)"
                    value={formValues.username}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    required
                    variant="outlined"
                    name="password"
                    label="Password"
                    value={formValues.password}
                    onChange={handleChange}
                />
            </DialogContent>

            <DialogActions>
                <Button variant="outlined" onClick={() => setUpdateData(null)}>Cancel</Button>
                <Button type="submit" variant="contained">Update</Button>
            </DialogActions>
        </Dialog>
    );
}

UpdateVault.propTypes = {
    updateData: PropTypes.object,
    setUpdateData: PropTypes.func.isRequired,
    data: PropTypes.func.isRequired
};
