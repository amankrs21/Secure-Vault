import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
    Button, TextField, IconButton, InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function PopupPin({ openPin, setOpenPin }) {
    const [forget, setForget] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        let svInfo = JSON.parse(localStorage.getItem("_svInfo")) || {};
        svInfo.key = btoa(formJson.key);
        localStorage.setItem("_svInfo", JSON.stringify(svInfo));
        setOpenPin(!openPin);
    }

    return (
        <Dialog
            maxWidth="xs"
            open={openPin}
            onClose={() => setOpenPin(!openPin)}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>Security PIN</DialogTitle>
            {forget ? (
                <DialogContent>
                    <DialogContentText mb={2}>
                        If you forget your security PIN, you will lose your all encrypted data.
                        <br />
                        Do you want to continue?
                    </DialogContentText>
                    <Button variant="text" mt={1} onClick={() => setForget(!forget)}>
                        Still remember your PIN?
                    </Button>
                </DialogContent>
            ) : (
                <DialogContent>
                    <DialogContentText mb={2}>
                        Please enter you PIN to decrypt your data.
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
                        Forget your PIN?
                    </Button>
                </DialogContent>
            )}
            <DialogActions>
                <Button variant='outlined' onClick={() => setOpenPin(!openPin)}>Cancel</Button>
                <Button type="submit" variant='contained'>Decrypt</Button>
            </DialogActions>
        </Dialog>
    )
}

PopupPin.propTypes = {
    openPin: PropTypes.bool.isRequired,
    setOpenPin: PropTypes.func.isRequired,
};
