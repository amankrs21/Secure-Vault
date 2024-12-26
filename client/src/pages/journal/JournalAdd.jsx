import PropTypes from 'prop-types';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button
} from '@mui/material';

export default function JournalAdd({ openAdd, setOpenAdd, data }) {
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
            <DialogTitle>
                Add a new Journal
            </DialogTitle>
            <DialogContent>
                <DialogContentText mb={2}>
                    Please fill the form to add a new journal.
                </DialogContentText>
                <TextField
                    autoFocus
                    fullWidth
                    required
                    name="title"
                    variant="outlined"
                    label="Journal Title"
                />
                <TextField
                    fullWidth
                    required
                    multiline
                    minRows={3}
                    maxRows={4}
                    name="content"
                    variant="outlined"
                    label="Journal Content"
                    sx={{ marginY: 2 }}
                />
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={() => setOpenAdd(!openAdd)}>
                    Cancel
                </Button>
                <Button type="submit" variant='contained'>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
}

JournalAdd.propTypes = {
    openAdd: PropTypes.bool.isRequired,
    setOpenAdd: PropTypes.func.isRequired,
    data: PropTypes.func.isRequired
};
