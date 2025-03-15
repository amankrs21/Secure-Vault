import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button,
    IconButton, InputAdornment
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { ERROR_MESSAGES } from '../../utils/constants';

export default function ForgetPass({ openFP, setOpenFP, data }) {
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState({});
    return (
        <Dialog
            maxWidth="xs"
            open={openFP}
            onClose={() => setOpenFP(!openFP)}
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        if (formJson.password !== formJson.cPassword) {
                            setErrors({ cPassword: ERROR_MESSAGES.PASSWORDS_NOT_MATCH });
                            return;
                        } else if (formJson.password.length < 8) {
                            setErrors({
                                password: ERROR_MESSAGES.PASSWORD_TOO_SHORT,
                                cPassword: ERROR_MESSAGES.PASSWORD_TOO_SHORT
                            });
                            return;
                        }
                        data(formJson);
                    },
                }
            }}
        >
            <DialogTitle>Forgot Password!</DialogTitle>
            <DialogContent>
                <DialogContentText mb={2}>
                    Please enter the required details to reset password.
                </DialogContentText>
                <TextField autoFocus fullWidth required variant="outlined" type='email' name="email"
                    label="Email Address" />
                <TextField sx={{ my: 2 }} fullWidth required variant="outlined" name="answer"
                    label="Your favorite place" />
                <TextField fullWidth required type="date" name="dob" label="Your Date of Birth"
                    slotProps={{ inputLabel: { shrink: true } }} />
                <TextField sx={{ my: 2 }} fullWidth required name="password" label="New Password"
                    type={show ? 'text' : 'password'} error={!!errors.password} helperText={errors.password}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShow(!show)} edge="end">
                                        {show ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }}
                />
                <TextField fullWidth required type="password" name="cPassword" label="Confirm Password"
                    error={!!errors.cPassword} helperText={errors.cPassword} />
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={() => setOpenFP(!openFP)}>Cancel</Button>
                <Button type="submit" variant='contained'>Update Password</Button>
            </DialogActions>
        </Dialog>
    )
}

ForgetPass.propTypes = {
    openFP: PropTypes.bool,
    setOpenFP: PropTypes.func,
    data: PropTypes.func
}