import Grid from '@mui/material/Grid2';
import { Container, Typography, Divider } from '@mui/material';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import './Home.css';
import { useAuth } from '../../hooks/useAuth';

// Home page component
export default function Home() {
    const { userData } = useAuth();
    document.title = "SecureVault | Home";

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>
                <span className="landing-wave" role="img" aria-labelledby="wave">👋</span>&nbsp;
                Hello {userData ? userData.name : "Guest User"},&nbsp;<br />
                Welcome to <b className='custom-home-text'>SecureVault</b> 🔐 – your trusted companion for digital security!
            </Typography>

            <Divider sx={{ opacity: 0.5, maxWidth: '90%', margin: '0 auto' }} />

            <Grid container mt={2} p={2}>

                <Grid size={{ xs: 12, md: 5 }} elevation={6}>
                    <DotLottieReact
                        loop
                        autoplay
                        src="/home.json"
                        style={{ maxHeight: "320px", width: "100%" }}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 7 }} mt={1}>
                    <Typography variant="body1" align="justify" p={1}>
                        <b className='custom-home-text'>Discover SecureVault</b> 🔒 – a powerful password manager and secure note storage app, built with <b>MERN</b> for <b>unmatched privacy</b> and <b>top-tier security</b>! 🛡️<br />
                        [You can say – <b>`Military-grade`</b> 🪖 encryption for ultimate data protection 🥷]
                        <br /><br />
                        Your sensitive data is <b>end-to-end encrypted</b> 🔐 using <b>advanced cipher techniques</b> and <b>Base64 encoding</b>, ensuring that only <b>you</b> can access it with your <b>personal PIN</b> 🔑. Not even <b>we</b> can decrypt your data!
                        <br /><br />
                        <b className='custom-home-text'>Lost your PIN?</b>⚠️ Unfortunately, there&apos;s no way to recover it, meaning your encrypted data remains permanently inaccessible. This guarantees <b>maximum security</b> and <b>complete control</b> over your information.
                        <br /><br />
                        Stay <b>secure</b> ✅, stay <b>in control</b> 💪 of your private information, and safeguard your digital world with <b>peace of mind</b>! 🧠
                    </Typography>
                    {/* <Typography variant="body2" align="justify">
                        <ul className="home-features">
                            <li>🔑 User-friendly password and secure note manager</li>
                            <li>🔒 Military-grade encryption for ultimate data protection</li>
                            <li>🔐 Only accessible via your unique personal PIN</li>
                            <li>🛡️ Zero-knowledge architecture – even we can’t see your data</li>
                            <li>🚀 Built with MERN stack for high performance and reliability</li>
                            <li>💪 Take complete control of your private information</li>
                        </ul>
                    </Typography> */}
                </Grid>

            </Grid>
            <Typography variant="body2" align="center" mt={4} md={2}>
                Powered by <b>React</b> and enhanced with <b>Material UI</b>, SecureVault delivers a smooth and intuitive user experience. React’s <b>component-based architecture</b> ensures dynamic, responsive interfaces, while Material UI’s <b>modern design elements</b> bring a polished look and feel.
            </Typography>
        </Container>
    );
}
