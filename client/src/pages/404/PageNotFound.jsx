import { Link } from "react-router-dom";
import {
    Container, Button, Typography
} from "@mui/material";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


// Page Not Found component
export default function PageNotFound() {
    return (
        <Container maxWidth="lg" sx={{ height: '100vh', textAlign: 'center' }}>
            <Typography variant="h3" pt={8}>
                404 - Page Not Found
            </Typography>
            <Typography variant="h5" py={1}>
                The page you are looking for does not exist.
            </Typography>
            <Button variant="contained" component={Link} to="/" sx={{ marginY: "30px" }}>
                Go to Home
            </Button>
            <div style={{ height: '50vh', width: '100%' }}>
                <DotLottieReact
                    src="PageNotFound.json"
                    loop={true}
                    autoplay={true}
                    style={{ width: '100%', height: '100%' }}
                />

            </div>
        </Container>
    );
}
