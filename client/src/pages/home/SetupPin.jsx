import PropTypes from 'prop-types';
import { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
    Button, TextField, IconButton, InputAdornment,
} from '@mui/material';
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import AuthUser from '../../components/auth/AuthUser';

export default function SetupPin({ openSetPin, setOpenSetPin }) {
    const { http } = AuthUser();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);
    const handleToggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const { key, cKey } = Object.fromEntries(formData.entries());

        if (key !== cKey) {
            return alert("PIN and Confirm PIN do not match.");
        }

        try {
            const response = await http.post('/pin/setText', { key });
            toast.info(response.data.message);

            const svInfo = JSON.parse(localStorage.getItem("_svInfo")) || {};
            svInfo.isFirstLogin = false;
            svInfo.key = btoa(key);
            localStorage.setItem("_svInfo", JSON.stringify(svInfo));

            setOpenSetPin(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog
            maxWidth="xs"
            open={openSetPin}
            onClose={() => setOpenSetPin(false)}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>Security PIN</DialogTitle>
            <DialogContent>
                <DialogContentText mb={2}>
                    <b style={{ color: 'red' }}>
                        Please note that your PIN will not be stored and used every where to encrypt and decrypt the password. Keep it safe!
                    </b>
                </DialogContentText>
                <TextField
                    autoFocus
                    fullWidth
                    required
                    name="key"
                    variant="outlined"
                    label="Security PIN"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleTogglePasswordVisibility}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    fullWidth
                    required
                    name="cKey"
                    variant="outlined"
                    label="Confirm PIN"
                    type={showConfirmPassword ? "text" : "password"}
                    sx={{ mt: 2 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleToggleConfirmPasswordVisibility}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={() => setOpenSetPin(false)}>
                    Cancel
                </Button>
                <Button type="submit" variant="contained">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

SetupPin.propTypes = {
    openSetPin: PropTypes.bool.isRequired,
    setOpenSetPin: PropTypes.func.isRequired,
};
