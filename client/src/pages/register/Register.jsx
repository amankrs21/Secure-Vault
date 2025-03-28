import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import {
    IconButton, InputAdornment, Avatar, Typography, TextField, Button
} from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Visibility from '@mui/icons-material/Visibility';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import './Register.css';
import { ERROR_MESSAGES } from '../../utils/constants';
import { useAuth } from '../../hooks/useAuth';
import { useLoading } from '../../hooks/useLoading';


// Register component
export default function Register() {
    document.title = 'SecureVault | Register';

    const navigate = useNavigate();
    const { setLoading } = useLoading();
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState({});
    const { http, isAuthenticated } = useAuth();

    const [formData, setFormData] = useState({
        dob: '',
        name: '',
        email: '',
        answer: '',
        password: '',
        cPassword: '',
    });
    const [backgroundImage, setBackgroundImage] = useState('/first-image.jpg');

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        const fetchImage = () => {
            const randomImageUrl = `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 10000)}`;
            const img = new Image();
            img.src = randomImageUrl;
            img.onload = () =>
                setBackgroundImage(randomImageUrl);
        };

        fetchImage();
        const intervalId = setInterval(fetchImage, 5000);

        return () => clearInterval(intervalId);
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.cPassword) {
            setErrors({ cPassword: ERROR_MESSAGES.PASSWORDS_NOT_MATCH });
            return;
        } else if (formData.password.length < 8) {
            setErrors({
                password: ERROR_MESSAGES.PASSWORD_TOO_SHORT,
                cPassword: ERROR_MESSAGES.PASSWORD_TOO_SHORT
            });
            return;
        }

        try {
            setLoading(true);
            const response = await http.post('/auth/register', formData);
            if (response) {
                toast.success(response.data.message);
                navigate('/login');
            }
        } catch (error) {
            console.error("Registration failed:", error);
            let errorMessage = error.response?.data?.message || ERROR_MESSAGES.UNKNOWN_ERROR;
            toast.error(errorMessage);
        } finally { setLoading(false); }
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                size={{ xs: false, sm: false, md: 7 }}
                sx={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'background-image 0.5s ease-in-out'
                }}
            />
            <Grid size={{ xs: 12, sm: 8, md: 5 }} elevation={6} className="register-container">
                <Box className="register-box">
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <HowToRegIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <TextField autoFocus fullWidth required name="name" label="Full Name" value={formData.name}
                            onChange={handleChange} error={!!errors.name} helperText={errors.name} />
                        <TextField sx={{ my: 2 }} fullWidth required type='email' name="email" label="Email Address"
                            value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
                        <TextField fullWidth required name="answer" label="What is your favorite place?"
                            value={formData.answer} onChange={handleChange} error={!!errors.answer} helperText={errors.answer} />
                        <TextField sx={{ my: 2 }} fullWidth required type="date" name="dob" label="Your Date of Birth"
                            value={formData.dob} onChange={handleChange} error={!!errors.dob} helperText={errors.dob}
                            slotProps={{ inputLabel: { shrink: true } }} />
                        <TextField fullWidth required name="password" label="Password" type={show ? 'text' : 'password'}
                            value={formData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password}
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
                            }} />
                        <TextField sx={{ my: 2 }} fullWidth required type="password" name="cPassword" label="Confirm Password"
                            value={formData.cPassword} onChange={handleChange} error={!!errors.cPassword} helperText={errors.cPassword} />
                        <Button fullWidth type='submit' variant="contained" sx={{ mt: 1, mb: 2 }}>
                            Register &nbsp; <ExitToAppIcon />
                        </Button>

                        <Grid sx={{ textAlign: "center" }}>
                            <Button variant="text" onClick={() => navigate("/login")}>
                                Already have an account? Login
                            </Button>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}
