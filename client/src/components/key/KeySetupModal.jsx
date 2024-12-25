import PropTypes from 'prop-types';
import { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
    Button, TextField, IconButton, InputAdornment,
} from '@mui/material';
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import AuthUser from '../../middleware/AuthProvider';

export default function KeySetupModal({ openSetup, setOpenSetup }) {
    const { http } = AuthUser();
    const [showPass, setShowPass] = useState(false);
    const [showCPass, setShowCPass] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const { key, cKey } = Object.fromEntries(formData.entries());

        if (key !== cKey) return alert("Key's are not matching.");

        try {
            let eKey = btoa(key);
            const response = await http.post('/pin/setText', { key: eKey });
            toast.success(response.data.message);
            localStorage.setItem("eKey", eKey);
            localStorage.removeItem("isKeySet");
            setOpenSetup(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog
            maxWidth="xs"
            open={openSetup}
            onClose={() => setOpenSetup(false)}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>Encryption Key</DialogTitle>
            <DialogContent>
                <DialogContentText mb={2}>
                    <b style={{ color: 'red' }}>
                        Please note that your KEY will not be stored anywhere but used every where to encrypt and decrypt data. Keep it safe!
                    </b>
                </DialogContentText>
                <TextField
                    autoFocus
                    fullWidth
                    required
                    name="key"
                    variant="outlined"
                    label="Security PIN"
                    type={showPass ? "text" : "password"}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={() => setShowPass(!showPass)}>
                                        {showPass ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <TextField
                    fullWidth
                    required
                    name="cKey"
                    variant="outlined"
                    label="Confirm PIN"
                    sx={{ mt: 2 }}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={() => setShowCPass(!showCPass)}>
                                        {showCPass ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={() => setOpenSetup(false)}>
                    Cancel
                </Button>
                <Button type="submit" variant="contained">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

KeySetupModal.propTypes = {
    openSetup: PropTypes.bool.isRequired,
    setOpenSetup: PropTypes.func.isRequired,
};
