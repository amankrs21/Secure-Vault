import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button
} from '@mui/material';


export default function JournalUpdate({ updateData, setUpdateData, data }) {

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
            <DialogTitle>Update Journal</DialogTitle>
            <DialogContent>
                <DialogContentText mb={2}>
                    Please update the form to modify the journal.
                </DialogContentText>

                <TextField
                    fullWidth
                    required
                    name="title"
                    variant="outlined"
                    label="Journal Title"
                    value={formValues.title}
                    onChange={handleChange}
                />

                <TextField
                    required
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={4}
                    name="content"
                    variant="outlined"
                    label="Journal Content"
                    sx={{ marginY: 2 }}
                    value={formValues.content}
                    onChange={handleChange}
                />
            </DialogContent>

            <DialogActions>
                <Button variant="outlined" onClick={() => setUpdateData(null)}>
                    Cancel
                </Button>
                <Button type="submit" variant="contained">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
}

JournalUpdate.propTypes = {
    updateData: PropTypes.object,
    setUpdateData: PropTypes.func.isRequired,
    data: PropTypes.func.isRequired,
};
