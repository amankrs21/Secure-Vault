import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
    Button, TextField, IconButton, InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';

import AuthProvider from '../../middleware/AuthProvider';

export default function KeyAccessModal({ openAccess, setOpenAccess }) {
    const { http } = AuthProvider();
    const [forget, setForget] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            if (forget) {
                const response = await http.get('/pin/reset');
                toast.warning(`${response.data.message}. Please login again to continue.`);
                localStorage.clear();
                setTimeout(() => { setOpenAccess(!openAccess); }, 3000);
            } else {
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                formJson.key = btoa(formJson.key);
                const response = await http.post('/pin/verify', formJson);
                localStorage.setItem("ekey", btoa(formJson.key));
                toast.success(response.data.message);
                setOpenAccess(!openAccess);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <Dialog
            maxWidth="xs"
            open={openAccess}
            onClose={() => setOpenAccess(!openAccess)}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>Encryption Key</DialogTitle>
            {forget ? (
                <DialogContent>
                    <DialogContentText mb={2}>
                        <b style={{ color: 'red' }}>
                            If you forget your Encryption Key, you will lose your all encrypted data. Encrypted data will be replaced with NULL.
                            <br />
                            Do you still want to continue?
                        </b>
                    </DialogContentText>
                    <Button variant="text" mt={1} onClick={() => setForget(!forget)}>
                        Still remember your KEY?
                    </Button>
                </DialogContent>
            ) : (
                <DialogContent>
                    <DialogContentText mb={2}>
                        Please enter you Encryption Key to decrypt your data.
                    </DialogContentText>
                    <TextField autoFocus fullWidth required name="key" variant="outlined"
                        label="Security PIN" type={showPass ? "text" : "password"}
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
                        }} />
                    <Button variant="text" mt={1} onClick={() => setForget(!forget)}>
                        Forget your KEY?
                    </Button>
                </DialogContent>
            )}
            <DialogActions>
                <Button variant='outlined' onClick={() => setOpenAccess(!openAccess)}>Cancel</Button>
                <Button type="submit" variant='contained'>
                    {forget ? 'Yes, I understand' : 'Access'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

KeyAccessModal.propTypes = {
    openAccess: PropTypes.bool.isRequired,
    setOpenAccess: PropTypes.func.isRequired,
};
