import './Home.css';
import Grid from '@mui/material/Grid2';
import { Container, Typography, Divider } from '@mui/material';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import AuthProvider from '../../middleware/AuthProvider';


export default function Home() {

    const { userName } = AuthProvider();
    document.title = "SecureVault | Home";

    return (
        <div className="home-main">
            <Container maxWidth="lg">
                <Typography pt={2} variant="h4" align="center" gutterBottom >
                    Hi  {userName ? userName.split(' ')[0] : "User"}👋<br />
                    Welcome to <b className='custom-home-text'>Secure Vault </b> 🔐 Application!
                </Typography>
                <Divider />
                <Grid container mt={2} p={2}>
                    <Grid size={{ xs: 12, md: 7 }} elevation={6}>
                        <DotLottieReact src="home.json" loop autoplay />
                    </Grid>
                    <Grid size={{ xs: 12, md: 5 }} mt={4}>
                        <Typography variant="body1" align="justify" mt={2} p={1}>
                            <b className='custom-home-text'>Explore Our SecureVault</b>🔒 – a powerful password manager and note storage app built with MERN, designed for <b>ultimate privacy</b> and <b>top-notch security!</b>🛡️ Your passwords and notes are encrypted 🔐 using advanced <b>cipher text</b> and <b>Base64 encryption</b>🚀, accessible only with your <b>personal PIN</b>🔑. Even <b>we</b> can’t decrypt your data!
                            <br />
                            If you <b className='custom-home-text'>lose your PIN</b>,⚠️ all your encrypted information is gone forever!🗝️ This ensures <b>maximum protection</b>.
                            <br />
                            Secure✅ your digital life with <b>confidence</b>💪 and <b>peace of mind</b>!🧠
                        </Typography>
                    </Grid>

                </Grid>
                <Typography variant="body2" align="center" my={5}>
                    Powered by React and enhanced with Material UI, our application delivers a seamless and intuitive user experience. React&apos;s component-based structure and virtual DOM enable dynamic, responsive interfaces, while Material UI&apos;s pre-built components offer a sleek, modern design.
                </Typography>
            </Container>
        </div>
    )
}