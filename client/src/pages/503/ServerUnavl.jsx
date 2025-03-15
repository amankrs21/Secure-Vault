import { Link } from "react-router-dom";
import {
    Container, Button, Typography
} from "@mui/material";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


// Server Unavailable component
export default function ServerUnavl() {
    return (
        <Container maxWidth="lg" sx={{ height: '100vh', textAlign: 'center' }}>
            <Typography variant="h3" pt={8}>
                503 - Service Unavailable
            </Typography>
            <Typography variant="h5" py={1}>
                The server is currently unavailable. Please try again later.
            </Typography>
            <Button variant="contained" component={Link} to="/" sx={{ marginY: "30px" }}>
                Go to Home
            </Button>
            <div style={{ height: '50vh', width: '100%' }}>
                <DotLottieReact
                    src="ServerUnavl.json"
                    loop={true}
                    autoplay={true}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </Container>
    );
}
