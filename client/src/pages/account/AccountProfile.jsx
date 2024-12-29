import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@mui/material';
import { Save } from '@mui/icons-material';

export default function AccountProfile({ userData }) {
    const [btnDisabled, setBtnDisabled] = useState(true);

    const [formValues, setFormValues] = useState({
        id: '',
        name: '',
        dateOfBirth: '',
        secretAnswer: '',
    });

    useEffect(() => {
        if (userData) {
            setFormValues({
                id: userData._id || '',
                name: userData.name || '',
                dateOfBirth: userData.dateOfBirth || '',
                secretAnswer: '',
            });
        }
    }, [userData]);

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
        <div className='account-profile-main'>
            <TextField
                disabled
                fullWidth
                name="email"
                label="Email"
                value={userData.email || ''}
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
                name="dateOfBirth"
                label="Date of Birth"
                type="date"
                value={formValues.dateOfBirth}
                onChange={handleChange}
                sx={{ marginY: 3 }}
            />
            <TextField
                fullWidth
                name="secretAnswer"
                label="Favorite Place (Changable, can't be viewed)"
                value={formValues.secretAnswer}
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
        </div>
    );
}

AccountProfile.propTypes = {
    userData: PropTypes.object,
};
