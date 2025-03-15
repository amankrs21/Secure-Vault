import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';

import { useAuth } from '../../hooks/useAuth';
import { useLoading } from '../../hooks/useLoading';


export default function AccountProfile({ userData }) {

    const { http } = useAuth();
    const { setLoading } = useLoading();
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
                name: userData?.name || '',
                dateOfBirth: userData?.dateOfBirth || '',
                secretAnswer: userData?.secretAnswer ? atob(userData.secretAnswer) : '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formValues.secretAnswer.length < 3) {
            toast.warning("Favorite place should be atleast 3 characters long.");
            return;
        }
        try {
            setLoading(true);
            const response = await http.patch('/user/update', formValues);
            toast.success(response.data.message);
            setBtnDisabled(true);
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        } finally { setLoading(false); }
    };

    return (
        <div className='account-profile-main'>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    disabled
                    fullWidth
                    name="email"
                    label="Email"
                    value={userData.email || ''}
                    sx={{ marginY: 3 }}
                />
                <TextField
                    required
                    fullWidth
                    name="name"
                    label="Full Name"
                    variant="outlined"
                    value={formValues.name}
                    onChange={handleChange}
                />
                <TextField
                    required
                    fullWidth
                    name="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    value={formValues.dateOfBirth}
                    onChange={handleChange}
                    sx={{ marginY: 3 }}
                />
                <TextField
                    required
                    fullWidth
                    name="secretAnswer"
                    label="Favorite Place"
                    value={formValues.secretAnswer}
                    onChange={handleChange}
                />
                <Button
                    type='submit'
                    color="primary"
                    variant="contained"
                    disabled={btnDisabled}
                    sx={{ marginTop: 4, float: 'right' }}
                >
                    Update Changes
                </Button>
            </Box>
        </div>
    );
}

AccountProfile.propTypes = {
    userData: PropTypes.object,
};
