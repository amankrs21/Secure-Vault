import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import {
    Accordion, AccordionDetails, AccordionSummary, Button, Container, Divider, TextField, Typography
} from "@mui/material";
import { toast } from 'react-toastify';
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AuthUser from "../../components/AuthUser";
import { useLoading } from "../../components/loading/useLoading";
import PopupPin from "../vault/PopupPin";

export default function Notes() {
    const { http } = AuthUser();
    const { setLoading } = useLoading();
    const [openPin, setOpenPin] = useState(false);
    const [notesData, setNotesData] = useState([]);
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleFetch = async (key) => {
        try {
            setLoading(true);
            const response = await http.post('/notes', { key });
            if (response.data.length == 0) {
                localStorage.removeItem('SecurityPin');
                return
            }
            setNotesData(response.data);
        } catch (error) {
            console.error(error);
            if (error.response) { toast.error(error.response.data.message); }
            else { toast.error('Something went wrong!'); }
            localStorage.removeItem('SecurityPin');
            setOpenPin(true);
        } finally { setLoading(false); }
    }

    useEffect(() => {
        // if (firstLogin) { return; }
        const pin = localStorage.getItem('SecurityPin') || null;
        if (pin) {
            handleFetch(pin);
        } else {
            setOpenPin(true);
        }
    }, []);

    return (
        <Container maxWidth="lg">
            {openPin && <PopupPin openPin={openPin} setOpenPin={setOpenPin} data={handleFetch} />}
            <Grid container justifyContent="space-between" alignItems="center" mt={3} spacing={2}>
                <Grid size={{ xs: 12, md: 6 }} textAlign={{ xs: 'center', md: 'left' }}>
                    <Typography pt={2} variant="h4" gutterBottom>
                        Your Secure Notes📝
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }} container justifyContent="flex-end" alignItems="center">
                    <div style={{ display: 'flex', width: '100%', gap: '10px' }}>
                        <TextField fullWidth variant="outlined" label="Search with Title"
                            slotProps={{
                                input: {
                                    endAdornment: <SearchIcon color='primary' />
                                }
                            }}
                        />
                        <Button variant='contained' color='primary' sx={{ paddingX: 3, whiteSpace: 'nowrap', backgroundColor: '#1976d2' }}>
                            Add New
                        </Button>
                    </div>
                </Grid>
            </Grid>

            <Divider sx={{ marginY: 3 }} />

            {(notesData.length == 0) ? (
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                    <Typography variant="h6">
                        No secure passwords available. Please add new records.
                    </Typography>
                    <Button variant='contained' color='primary'
                        sx={{ paddingX: 3, whiteSpace: 'nowrap', backgroundColor: '#1976d2', marginTop: 2 }}
                    >
                        Add New Password
                    </Button>
                </div>
            ) : (
                <Container maxWidth="md" sx={{ backgroundColor: '#f2f2f2', paddingY: 2, borderRadius: 2 }}>
                    {notesData.map((data, index) => (
                        <Accordion key={index} sx={{ marginY: 1 }} expanded={expanded === `panel${index + 1}`} onChange={handleChange(`panel${index + 1}`)}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>{data.title}</AccordionSummary>
                            <AccordionDetails>
                                {data.content}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Container>
            )}
        </Container>
    );
}
