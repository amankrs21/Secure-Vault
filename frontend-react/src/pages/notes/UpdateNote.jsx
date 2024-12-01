import PropTypes from 'prop-types';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button
} from '@mui/material';
import { useState } from 'react';


export default function UpdateNote({ updateData, setUpdateData, data }) {

    const [formValues, setFormValues] = useState({
        id: updateData?._id || '',
        title: updateData?.title || '',
        content: updateData?.content || '',
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
                    Please update the form to modify the note.
                </DialogContentText>

                <TextField fullWidth required name="title" variant="outlined" label="Note Title"
                    value={formValues.title} onChange={handleChange} />
                <TextField fullWidth required multiline name="content" variant="outlined" label="Note Content"
                    minRows={3} maxRows={4} sx={{ marginY: 2 }} value={formValues.content} onChange={handleChange} />
            </DialogContent>

            <DialogActions>
                <Button variant="outlined" onClick={() => setUpdateData(null)}>Cancel</Button>
                <Button type="submit" variant="contained">Update</Button>
            </DialogActions>
        </Dialog>
    )
}


UpdateNote.propTypes = {
    updateData: PropTypes.object,
    setUpdateData: PropTypes.func.isRequired,
    data: PropTypes.func.isRequired
};
