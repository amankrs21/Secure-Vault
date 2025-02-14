import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';

import { useLoading } from './useLoading';

export default function Loading() {
    const { loading } = useLoading();
    const [loadingMessage, setLoadingMessage] = useState("Loading...");

    // Change the loading message after 3 seconds
    useEffect(() => {
        let timer;
        if (loading) {
            timer = setTimeout(() => {
                setLoadingMessage("Please wait, it's taking longer than usual.");
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [loading]);

    if (!loading) {
        return null;
    }

    return (
        <Box
            sx={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(2px)',
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
            }}
        >
            <CircularProgress color="primary" size="3rem" />
            <Typography variant="h6" color="primary" fontWeight={600} sx={{ mt: 2 }}>
                {loadingMessage}
            </Typography>
        </Box>
    );
}
