import { useState } from 'react';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import { TextField, Button, InputAdornment, IconButton, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useAuth } from '../../hooks/useAuth';
import { useLoading } from '../../hooks/useLoading';


// Component to update user password
export default function AccountPass() {

    const { http } = useAuth();
    const { setLoading } = useLoading();
    const [btnDisabled, setBtnDisabled] = useState(true);

    const [passwords, setPasswords] = useState({
        oldPassword: '',
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
        setBtnDisabled(false);
    };

    const handleTogglePassword = (field) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { oldPassword, newPassword, confirmPassword } = passwords;
        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match.");
            return;
        }

        try {
            setLoading(true);
            const response = await http.patch('/user/changePassword', { oldPassword, newPassword });
            setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
            toast.success(response.data.message);
            setBtnDisabled(true);
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        } finally { setLoading(false); }
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
                    name="oldPassword"
                    label="Current Password"
                    type={showPassword.current ? 'text' : 'password'}
                    value={passwords.oldPassword}
                    onChange={handleChange}
                    sx={{ marginY: 3 }}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => handleTogglePassword('current')}>
                                        {showPassword.current ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }
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
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => handleTogglePassword('new')}>
                                        {showPassword.new ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }
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
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => handleTogglePassword('confirm')}>
                                        {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }
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
