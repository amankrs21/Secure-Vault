import './Login.css';
import { useEffect, useState } from 'react';
import { Box, IconButton, InputAdornment } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Avatar, Typography, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import ForgetPass from './ForgetPass';
import AuthProvider from '../../middleware/AuthProvider';
import { ERROR_MESSAGES } from '../../components/constants';
import { useLoading } from '../../components/loading/useLoading';

export default function Login() {
    const navigate = useNavigate();
    const { setLoading } = useLoading();
    const [show, setShow] = useState(false);
    const [openFP, setOpenFP] = useState(false);
    const { http, setToken, isValidToken } = AuthProvider();
    const [formData, setFormData] = useState({ email: '', password: '' });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (isValidToken(token)) { navigate('/home'); }
    }, [isValidToken, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleForget = async (data) => {
        try {
            setLoading(true);
            const response = await http.patch('/auth/forget', data);
            toast.success(response.data.message);
        } catch (error) {
            console.error(error);
            if (error.response.data.message) {
                return toast.error(error.response.data.message);
            }
            toast.error('Something went wrong!');
        } finally { setLoading(false); }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await http.post('/auth/login', formData);
            if (response.data.token) {
                setToken(response.data.token);
                toast.success(response.data.message);
                if (!response.data.isKeySet) localStorage.setItem("isKeySet", false);
                navigate('/home');
            }
        } catch (error) {
            console.error("Login failed:", error);
            let errorMessage = error.response?.data?.message || ERROR_MESSAGES.UNKNOWN_ERROR;
            toast.error(errorMessage);
        } finally { setLoading(false); }
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            {openFP && <ForgetPass openFP={openFP} setOpenFP={setOpenFP} data={handleForget} />}
            <Grid
                size={{ xs: false, sm: false, md: 7 }}
                sx={{
                    backgroundImage: 'url(./login2.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid size={{ xs: 12, sm: 12, md: 5 }} elevation={6} className="login-container">
                <Box className="login-box">
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleLogin}>
                        <TextField sx={{ my: 2 }} autoFocus fullWidth required type='email' name="email"
                            label="Email Address" value={formData.email} onChange={handleChange} />
                        <TextField fullWidth required name="password" label="Password"
                            type={show ? 'text' : 'password'} value={formData.password} onChange={handleChange}
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
                        <Grid mt={1}>
                            <Typography variant="body2" className="login-forget" onClick={() => setOpenFP(true)}>
                                Forgot password?
                            </Typography>
                        </Grid>
                        <Button
                            fullWidth
                            type='submit'
                            variant="contained"
                            sx={{ mt: 3, mb: 6 }}
                        >
                            Sign In &nbsp; <LoginIcon />
                        </Button>

                        <Grid sx={{ textAlign: "center" }}>
                            <Button variant="text" onClick={() => navigate("/register")}>
                                Don&apos;t have an account? Sign Up
                            </Button>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}
