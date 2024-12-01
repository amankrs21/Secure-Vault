import './Notes.css';
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import {
    Accordion, AccordionDetails, AccordionSummary, Button, Container, Divider, TextField, Tooltip, Typography
} from "@mui/material";
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import PopupPin from "../vault/PopupPin";
import AuthUser from "../../components/AuthUser";
import { useLoading } from "../../components/loading/useLoading";
import AddNote from './AddNote';
import UpdateNote from './UpdateNote';
import DeleteNote from './DeleteNote';


export default function Notes() {
    const { http } = AuthUser();
    const { setLoading } = useLoading();
    const [openPin, setOpenPin] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [notesData, setNotesData] = useState([]);
    const [updateData, setUpdateData] = useState(null);
    const [deleteData, setDeleteData] = useState(null);
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

    const handleAdd = async (data) => {
        setLoading(true);
        try {
            data.key = localStorage.getItem('SecurityPin');
            const response = await http.post('/note/add', data);
            toast.success(response.data.message);
            handleFetch(data.key);
        } catch (error) {
            console.error(error);
            if (error.response) { toast.error(error.response.data.message); }
            else { toast.error('Something went wrong!'); }
        } finally { setLoading(false); }
    }

    const handleUpdate = async (data) => {
        setLoading(true);
        try {
            data.key = localStorage.getItem('SecurityPin');
            const response = await http.patch('/note/update', data);
            toast.success(response.data.message);
            handleFetch(data.key);
        } catch (error) {
            console.error(error);
            if (error.response) { toast.error(error.response.data.message); }
            else { toast.error('Something went wrong!'); }
        } finally { setLoading(false); }
    }

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            const response = await http.delete(`/note/delete`, { data: { id } });
            toast.success(response.data.message);
            handleFetch(localStorage.getItem('SecurityPin'));
        } catch (error) {
            console.error(error);
            if (error.response) { toast.error(error.response.data.message); }
            else { toast.error('Something went wrong!'); }
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
            {openAdd && <AddNote openAdd={openAdd} setOpenAdd={setOpenAdd} data={handleAdd} />}
            {(updateData !== null) && <UpdateNote updateData={updateData} setUpdateData={setUpdateData} data={handleUpdate} />}
            {(deleteData !== null) && <DeleteNote deleteData={deleteData} setDeleteData={setDeleteData} data={handleDelete} />}

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
                        <Button variant='contained' color='primary' onClick={() => setOpenAdd(true)}
                            sx={{ paddingX: 3, whiteSpace: 'nowrap', backgroundColor: '#1976d2' }}>
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
                    <Button variant='contained' color='primary' onClick={() => setOpenAdd(true)}
                        sx={{ paddingX: 3, whiteSpace: 'nowrap', backgroundColor: '#1976d2', marginTop: 2 }}
                    >
                        Add New Password
                    </Button>
                </div>
            ) : (
                <Container maxWidth="md" sx={{ backgroundColor: '#f2f2f2', paddingY: 2, borderRadius: 2 }}>
                    {notesData.map((data, index) => (
                        <Accordion key={data._id} sx={{ marginY: 1 }} expanded={expanded === `panel${index + 1}`} onChange={handleChange(`panel${index + 1}`)}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>{data.title}</AccordionSummary>
                            <AccordionDetails sx={{ whiteSpace: 'pre-wrap' }}>
                                {data.content}
                                <Divider sx={{ marginTop: 1 }} />
                                <div className="note-update-section">
                                    <div className='note-update-time'>
                                        <Tooltip title="Last Updated" placement="top">
                                            <AccessAlarmsIcon color='warning' />
                                        </Tooltip>&nbsp;
                                        {new Date(data.updatedAt).toLocaleString()}
                                    </div>
                                    <div className="note-update-buttons">
                                        <Button size='small' variant="outlined" onClick={() => setUpdateData(data)}>
                                            <Tooltip title="Edit this Note" placement="top">
                                                <EditIcon color='primary' />
                                            </Tooltip>
                                        </Button>
                                        <Button size='small' variant="contained" color='error' onClick={() => setDeleteData(data._id)}>
                                            <Tooltip title="Delete this Note" placement="top">
                                                <DeleteForeverIcon />
                                            </Tooltip>
                                        </Button>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Container>
            )}
        </Container>
    );
}
