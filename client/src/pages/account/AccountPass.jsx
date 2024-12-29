import { useState } from 'react';
import Box from '@mui/material/Box';
import { TextField, Button, InputAdornment, IconButton, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function AccountPass() {

    const [btnDisabled, setBtnDisabled] = useState(true);

    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords((prev) => ({ ...prev, [name]: value }));
        btnDisabled && setBtnDisabled(false);
    };

    const handleTogglePassword = (field) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = () => {
        console.log('Password Change Request:', passwords);
    };

    return (
        <div className='account-pass-main'>
            <Typography variant="caption" color="error" sx={{ marginTop: 1, float: 'right' }}>
                *You can update your password here.
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    required
                    fullWidth
                    name="currentPassword"
                    label="Current Password"
                    type={showPassword.current ? 'text' : 'password'}
                    value={passwords.currentPassword}
                    onChange={handleChange}
                    sx={{ marginY: 3 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => handleTogglePassword('current')}>
                                    {showPassword.current ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    required
                    fullWidth
                    name="newPassword"
                    label="New Password"
                    type={showPassword.new ? 'text' : 'password'}
                    value={passwords.newPassword}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => handleTogglePassword('new')}>
                                    {showPassword.new ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm New Password"
                    type={showPassword.confirm ? 'text' : 'password'}
                    value={passwords.confirmPassword}
                    onChange={handleChange}
                    sx={{ marginY: 3 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => handleTogglePassword('confirm')}>
                                    {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    type='submit'
                    color="secondary"
                    variant="contained"
                    disabled={btnDisabled}
                    sx={{ marginTop: 1, float: 'right' }}
                >
                    Update Password
                </Button>
            </Box>

        </div>
    );
}
