import { useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid2';
import { TextField, Typography, Button } from '@mui/material';
import { Save } from '@mui/icons-material';

export default function AccountProfile({ userData }) {

    const [btnDisabled, setBtnDisabled] = useState(true);

    const [formValues, setFormValues] = useState({
        id: userData?._id || '',
        name: userData?.name || '',
        dateOfBirth: userData?.dateOfBirth || '',
        secretAnswer: "",
    });

    const handleChange = (e) => {
        btnDisabled && setBtnDisabled(false);
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSave = () => {
        formValues.secretAnswer = btoa(formValues.secretAnswer);
        console.log("Saving new data:", formValues);
    };

    return (
        <Grid container>
            <Grid size={{ xs: 12, md: 4 }} className="account-profile-intro">
                <div className='account-profile-img'>
                    <img src={`https://robohash.org/${userData.name}`} alt={userData.name} />
                </div>
                <Typography gutterBottom variant="h5" fontWeight={700}>
                    Hi {userData.name ? (userData?.name.split(' ')[0]) : "User"} 👋
                </Typography>
                <Typography variant="substitle1" marginTop={3}>
                    created on:&nbsp;
                    <b style={{ color: '#1976d2' }}>{new Date(userData.createdAt).toDateString()}</b>
                </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
                <Typography variant="h5" color='primary' fontWeight={700} marginY={2}>
                    Update Profile
                </Typography>
                <Typography variant="caption" color="error">
                    *You can only update your name, secret answer, and date of birth here.
                </Typography>
                <br />
                <TextField
                    disabled
                    fullWidth
                    name="email"
                    label="Email"
                    value={userData.email}
                    sx={{ marginY: 3 }}
                />
                <TextField
                    fullWidth
                    required
                    name="name"
                    label="Full Name"
                    variant="outlined"
                    value={formValues.name}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    name="secretAnswer"
                    label="Favorite Place (Changable can't be viewed)"
                    value={formValues.secretAnswer}
                    onChange={handleChange}
                    sx={{ marginY: 3 }}
                />
                <TextField
                    fullWidth
                    name="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    value={formValues.dateOfBirth}
                    onChange={handleChange}
                />

                <Button
                    disabled={btnDisabled}
                    color="primary"
                    variant="contained"
                    onClick={handleSave}
                    sx={{ marginTop: 4, float: 'right' }}
                    startIcon={<Save />}
                >
                    Update Changes
                </Button>
            </Grid>
        </Grid>
    );
}

AccountProfile.propTypes = {
    userData: PropTypes.object
};
