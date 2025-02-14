import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Button, Container } from '@mui/material';
import { toast } from 'react-toastify';

import "./Account.css";
import AuthProvider from '../../middleware/AuthProvider';
import AccountProfile from './AccountProfile';
import AccountPass from './AccountPass';
import { useLoading } from '../../components/loading/useLoading';
import AccountDelete from './AccountDelete';

export default function Account() {
    document.title = "SecureVault | Account";

    const { http } = AuthProvider();
    const { setLoading } = useLoading();
    const [userData, setUserData] = useState({});
    const [openDelete, setOpenDelete] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { return; }
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await http.get('/auth/user');
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
        <Container maxWidth="md" className='account'>
            {openDelete && <AccountDelete openDelete={openDelete} setOpenDelete={setOpenDelete} />}
            <div className='account-header'>
                <div className='account-header-img'>
                    <img src={`https://robohash.org/${userData.name}`} alt={userData.name} />
                </div>
                <div className='account-header-name'>
                    <h1>Hi <b>{userData ? userData.name : "User"}</b> 👋</h1>
                    <br />
                    <h4>created on:&nbsp;<b>{new Date(userData?.createdAt).toDateString()}</b></h4>
                </div>
            </div>
            <Grid container mt={2} spacing={2} className='account-main'>
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
                sx={{ float: 'right', mt: 3 }}
                onClick={() => { setOpenDelete(true) }}>
                Delete Account Permanently
            </Button>
        </Container>
    );
}
