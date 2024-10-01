import './Home.css';
import Grid from '@mui/material/Grid2';
import { Container, Typography, Divider } from '@mui/material';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Home() {
    const authData = JSON.parse(localStorage.getItem('authData')) || null;
    return (
        <div className="home-main">
            <Container maxWidth="lg">
                <Typography pt={2} variant="h4" align="center" gutterBottom >
                    Hi  {authData ? authData.user.name.split(' ')[0] : "User"}👋<br />
                    Welcome to <a>Secure Vault </a> 🔐 Application!
                </Typography>
                <Divider />
                <Grid container mt={2} p={2}>
                    <Grid size={{ xs: 12, md: 7 }} elevation={6}>
                        <DotLottieReact src="home.json" loop autoplay />
                    </Grid>
                    <Grid size={{ xs: 12, md: 5 }} mt={4}>
                        <Typography variant="body1" align="justify" mt={2} p={1}>
                            <a>Explore Our SecureVault</a>🔒 – a powerful password manager and note storage app built with MERN, designed for <b>ultimate privacy</b> and <b>top-notch security!</b>🛡️ Your passwords and notes are encrypted 🔐 using advanced <b>cipher text</b> and <b>Base64 encryption</b>🚀, accessible only with your <b>personal PIN</b>🔑. Even <b>we</b> can’t decrypt your data!
                            <br />
                            If you <a>lose your PIN</a>,⚠️ all your encrypted information is gone forever!🗝️ This ensures <b>maximum protection</b>.
                            <br />
                            Secure✅ your digital life with <b>confidence</b>💪 and <b>peace of mind</b>!🧠
                        </Typography>
                    </Grid>

                </Grid>
                {/* <Grid container spacing={3} justifyContent="center" mt={4}>
                    <Grid size={{ xs: 12, md: 5 }} elevation={6}>
                        <Card className='home-card' onClick={() => navigate('/vault')}>
                            <Typography variant="h6" align="center" gutterBottom>Secure Vault</Typography>
                            <Typography variant="body2" align="justify">
                                The PasswordSchema securely stores encrypted passwords with fields for name, username, and password. It tracks updates with updatedAt and links each entry to the user who created it via createdBy. Passwords are safely encrypted, ensuring user privacy and data protection.
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 5 }} elevation={6}>
                        <Card className='home-card' onClick={() => navigate('/weather')}>
                            <Typography variant="h6" align="center" gutterBottom>Secure Notes</Typography>
                            <Typography variant="body2" align="justify">
                                The SecureNoteSchema stores encrypted notes with fields for `title` and `notes` (in encrypted form). It tracks changes using `updatedAt` and links each note to its creator via `createdBy`. This ensures user notes are securely encrypted and protected for privacy and data integrity.
                            </Typography>
                        </Card>
                    </Grid>
                </Grid> */}
                <Typography variant="body2" align="center" my={5}>
                    Powered by React and enhanced with Material UI, our application delivers a seamless and intuitive user experience. React&apos;s component-based structure and virtual DOM enable dynamic, responsive interfaces, while Material UI&apos;s pre-built components offer a sleek, modern design.
                </Typography>
            </Container>
        </div>
    )
}