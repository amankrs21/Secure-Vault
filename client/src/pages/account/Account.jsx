import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Button, Card, Container, Typography } from '@mui/material';
import { toast } from 'react-toastify';

import "./Account.css";
import AccountProfile from './AccountProfile';
import AccountPass from './AccountPass';
import AccountDelete from './AccountDelete';
import { useAuth } from '../../hooks/useAuth';
import { useLoading } from '../../hooks/useLoading';


// Component to display user account details
export default function Account() {
    document.title = "SecureVault | Account";

    const { http } = useAuth();
    const { setLoading } = useLoading();
    const [userData, setUserData] = useState({});
    const [openDelete, setOpenDelete] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { return; }
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await http.get('/user/fetch');
                setUserData(response.data);
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch user data");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [http, setLoading]);

    return (
        <Container maxWidth="lg">
            {openDelete && <AccountDelete openDelete={openDelete} setOpenDelete={setOpenDelete} />}

            <Card raised sx={{ padding: 2, marginY: 1, backgroundColor: '#f5f5f5' }}>
                <div className='account-header'>
                    <div className='account-header-img'>
                        <img src={`https://robohash.org/${userData.name}`} alt={userData.name} />
                    </div>
                    <div>
                        <Typography variant='h4'>Hi <b style={{ color: '#1976d2' }}>{userData.name}</b></Typography>
                        <Typography variant='h6'>created on: <b>{new Date(userData.createdAt).toDateString()}</b></Typography>
                    </div>
                </div>

                <Grid container mt={1} spacing={1} className='account-main'>
                    <Grid size={{ xs: 12, md: 6 }} className='account-profile'>
                        {userData && <AccountProfile userData={userData} />}
                    </Grid>
                    <hr />
                    <Grid size={{ xs: 12, md: 5 }} className='account-pass'>
                        <AccountPass />
                    </Grid>
                </Grid>
                <Button
                    color='error'
                    variant='contained'
                    sx={{ float: 'right', mt: 2 }}
                    onClick={() => { setOpenDelete(true) }}>
                    Delete Account Permanently
                </Button>
            </Card>
        </Container>
    );
}
