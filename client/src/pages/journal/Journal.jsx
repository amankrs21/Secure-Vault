/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import {
    Accordion, AccordionDetails, AccordionSummary, Button, Card, Container,
    Divider, TextField, Tooltip, Typography
} from "@mui/material";
import { toast } from 'react-toastify';
import debounce from 'lodash.debounce';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import './Journal.css';
import JournalAdd from './JournalAdd';
import JournalUpdate from './JournalUpdate';
import JournalDelete from './JournalDelete';
import { useAuth } from "../../hooks/useAuth";
import { useLoading } from "../../hooks/useLoading";


// Journal Component
export default function Journal() {
    document.title = 'SecureVault | Journal';

    const { http } = useAuth();
    const { setLoading } = useLoading();
    const [openAdd, setOpenAdd] = useState(false);
    const [decrypted, setDecrypted] = useState('');
    const [expanded, setExpanded] = useState(null);
    const [updateData, setUpdateData] = useState(null);
    const [deleteData, setDeleteData] = useState(null);
    const [journalData, setJournalData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { return; }
        const localJournal = JSON.parse(localStorage.getItem('localJournal'));
        if (localJournal) {
            setJournalData(localJournal);
            if (localJournal.length > 0)
                handleDecrypt(localJournal[0]._id);
        }
        else { handleFetch(); }
    }, []);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
        if (newExpanded) handleDecrypt(panel);
    };

    const handleFetch = async () => {
        try {
            setLoading(true);
            const response = await http.get('/journal/fetch');
            localStorage.setItem('localJournal', JSON.stringify(response.data));
            setJournalData(response.data);
            if (expanded) { handleDecrypt(expanded); }
            else if (response.data.length > 0) { handleDecrypt(response.data[0]._id); }
        } catch (error) {
            console.error(error);
            if (error.response) { toast.error(error.response.data.message); }
            else { toast.error('Something went wrong!'); }
        } finally { setLoading(false); }
    }

    const handleAdd = async (data) => {
        try {
            setLoading(true);
            data.key = localStorage.getItem('eKey');
            const response = await http.post('/journal/add', data);
            toast.success(response.data.message);
            setOpenAdd(false);
            await handleFetch();
        } catch (error) {
            console.error(error);
            if (error.response) { toast.error(error.response.data.message); }
            else { toast.error('Something went wrong!'); }
        } finally { setLoading(false); }
    }

    const preHandleUpdate = (data) => {
        data.content = decrypted;
        setUpdateData(data);
    }

    const handleUpdate = async (data) => {
        try {
            setLoading(true);
            data.key = localStorage.getItem('eKey');
            const response = await http.patch('/journal/update', data);
            toast.success(response.data.message);
            setUpdateData(null);
            await handleFetch();
        } catch (error) {
            console.error(error);
            if (error.response) { toast.error(error.response.data.message); }
            else { toast.error('Something went wrong!'); }
        } finally { setLoading(false); }
    }

    const preHandleDelete = (data) => {
        setExpanded(null);
        setDeleteData(data._id);
    }

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await http.delete(`/journal/delete/${id}`);
            toast.success("Journal deleted successfully!");
            setDeleteData(null);
            await handleFetch();
        } catch (error) {
            console.error(error);
            if (error.response) { toast.error(error.response.data.message); }
            else { toast.error('Something went wrong!'); }
        } finally { setLoading(false); }
    }

    const handleDecrypt = async (id) => {
        try {
            setExpanded(id);
            setDecrypted('');
            setLoading(true);
            const response = await http.post(`/journal/${id}`, { key: localStorage.getItem('eKey') });
            setDecrypted(response.data);
        } catch (error) {
            console.error(error);
            if (error.response) { toast.error(error.response.data.message); }
            else { toast.error('Something went wrong!'); }
        } finally { setLoading(false); }
    }

    const handleSearch = (value) => {
        const localJournal = JSON.parse(localStorage.getItem('localJournal'));
        if (value === '') { setJournalData(localJournal); handleDecrypt(localJournal[0]._id); }
        else {
            const search = journalData.filter((data) => data.title.toLowerCase().includes(value.toLowerCase()));
            setJournalData(search);
            handleDecrypt(search[0]._id);
        }
    }

    return (
        <Container maxWidth="lg">
            {openAdd && <JournalAdd openAdd={openAdd} setOpenAdd={setOpenAdd} data={handleAdd} />}
            {(updateData !== null) && <JournalUpdate updateData={updateData} setUpdateData={setUpdateData} data={handleUpdate} />}
            {(deleteData !== null) && <JournalDelete deleteData={deleteData} setDeleteData={setDeleteData} data={handleDelete} />}

            <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                <Grid size={{ xs: 12, md: 6 }} textAlign={{ xs: 'center', md: 'left' }}>
                    <Typography pt={2} variant="h4" gutterBottom>
                        Your Secure Journals📝
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }} container justifyContent="flex-end" alignItems="center">
                    <div style={{ display: 'flex', width: '100%', gap: '10px' }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Search with Title"
                            slotProps={{
                                input: {
                                    endAdornment: <SearchIcon color='primary' />
                                }
                            }}
                            onChange={debounce((e) => handleSearch(e.target.value), 1000)}
                        />
                        <Button variant='contained' color='primary' onClick={() => setOpenAdd(true)}
                            sx={{ paddingX: 3, whiteSpace: 'nowrap', backgroundColor: '#1976d2' }}>
                            + Add New
                        </Button>
                    </div>
                </Grid>
            </Grid>

            <Divider sx={{ opacity: 0.8, margin: '0 auto' }} />

            {(journalData.length == 0) ? (
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                    <Typography variant="h6">
                        No journal available. Please add new records.
                    </Typography>
                    <Button variant='contained' onClick={() => setOpenAdd(true)}
                        sx={{ paddingX: 3, whiteSpace: 'nowrap', backgroundColor: '#1976d2', marginTop: 2 }}>
                        + Add New Journal
                    </Button>
                </div>
            ) : (
                <Card raised sx={{ padding: 2, marginTop: 2, backgroundColor: '#f5f5f5' }}>
                    {journalData.map((data) => (
                        <Accordion key={data._id} sx={{ marginY: 1 }} expanded={expanded === data._id} onChange={handleChange(data._id)}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6" color="primary" fontWeight={600}>{data.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ whiteSpace: 'pre-wrap' }}>
                                {decrypted}
                                <Divider sx={{ marginTop: 1 }} />
                                <div className="journal-update-section">
                                    <div className='journal-update-time'>
                                        <Tooltip title="Last Updated" placement="top">
                                            <AccessAlarmsIcon color='warning' />
                                        </Tooltip>&nbsp;
                                        {new Date(data.updatedAt).toLocaleString()}
                                    </div>
                                    <div className="journal-update-buttons">
                                        <Button size='small' variant="outlined" onClick={() => preHandleUpdate(data)}>
                                            <Tooltip title="Edit this Journal" placement="top">
                                                <EditIcon color='primary' />
                                            </Tooltip>
                                        </Button>
                                        <Button size='small' variant="contained" color='error' onClick={() => preHandleDelete(data)}>
                                            <Tooltip title="Delete this Journal" placement="top">
                                                <DeleteForeverIcon />
                                            </Tooltip>
                                        </Button>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Card>
            )}
        </Container>
    );
}
