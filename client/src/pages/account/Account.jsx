import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import { toast } from 'react-toastify';

import "./Account.css";
import AuthProvider from '../../middleware/AuthProvider';
import AccountProfile from './AccountProfile';
import AccountPass from './AccountPass';
import { useLoading } from '../../components/loading/useLoading';

export default function Account() {
    document.title = "SecureVault | Account";

    const { http } = AuthProvider();
    const [userData, setUserData] = useState({});
    const { loading, setLoading } = useLoading(true);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const response = await http.get('/auth/user');
            if (response.data) {
                setUserData(response.data);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch user data");
        } finally { setLoading(false); }
    };

    return (
        <div className="account-profile">
            {loading ? "" :
                <Container maxWidth="lg">
                    <Grid container mt={2} spacing={2}>

                        <Grid size={{ xs: 12, md: 7 }}>
                            <AccountProfile userData={userData} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <AccountPass />
                        </Grid>
                    </Grid>
                </Container>
            }
        </div>
    );
}
