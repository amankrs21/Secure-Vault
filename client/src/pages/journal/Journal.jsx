import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import {
    Accordion, AccordionDetails, AccordionSummary, Button, Container, Divider, TextField, Tooltip, Typography
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
import AuthProvider from '../../middleware/AuthProvider';
import { useLoading } from "../../components/loading/useLoading";


export default function Journal() {
    document.title = 'SecureVault | Journal';

    const { http } = AuthProvider();
    const { setLoading } = useLoading();
    const [openAdd, setOpenAdd] = useState(false);
    const [decrypted, setDecrypted] = useState('');
    const [expanded, setExpanded] = useState(null);
    const [jornalData, setJournalData] = useState([]);
    const [updateData, setUpdateData] = useState(null);
    const [deleteData, setDeleteData] = useState(null);

    useEffect(() => {
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
            const response = await http.get('/journals');
            localStorage.setItem('localJournal', JSON.stringify(response.data));
            setJournalData(response.data);
            console.log(" == ", expanded);
            if (expanded) { handleDecrypt(expanded); }
            else if (response.data.length > 0) { handleDecrypt(response.data[0]._id); }
        } catch (error) {
            console.error(error);
            if (error.response) { toast.error(error.response.data.message); }
            else { toast.error('Something went wrong!'); }
        } finally { setLoading(false); }
    }

    const handleDecrypt = async (id) => {
        try {
            setExpanded(id);
            setLoading(true);
            const response = await http.post(`/journal/${id}`, { key: localStorage.getItem('eKey') });
            setDecrypted(response.data);
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
            await handleFetch();
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
            const search = jornalData.filter((data) => data.title.toLowerCase().includes(value.toLowerCase()));
            setJournalData(search);
            handleDecrypt(search[0]._id);
        }
    }

    return (
        <Container maxWidth="lg">
            {openAdd && <JournalAdd openAdd={openAdd} setOpenAdd={setOpenAdd} data={handleAdd} />}
            {(updateData !== null) && <JournalUpdate updateData={updateData} setUpdateData={setUpdateData} data={handleUpdate} />}
            {(deleteData !== null) && <JournalDelete deleteData={deleteData} setDeleteData={setDeleteData} data={handleDelete} />}

            <Grid container justifyContent="space-between" alignItems="center" mt={3} spacing={2}>
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
                            Add New
                        </Button>
                    </div>
                </Grid>
            </Grid>

            <Divider sx={{ marginY: 3 }} />

            {(jornalData.length == 0) ? (
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                    <Typography variant="h6">
                        No journal available. Please add new records.
                    </Typography>
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={() => setOpenAdd(true)}
                        sx={{ paddingX: 3, whiteSpace: 'nowrap', backgroundColor: '#1976d2', marginTop: 2 }}
                    >
                        Add New Journal
                    </Button>
                </div>
            ) : (
                <Container maxWidth="md" sx={{ backgroundColor: '#f2f2f2', paddingY: 2, borderRadius: 2 }}>
                    {jornalData.map((data) => (
                        <Accordion key={data._id} sx={{ marginY: 1 }} expanded={expanded === data._id} onChange={handleChange(data._id)}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>{data.title}</AccordionSummary>
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
                </Container>
            )}
        </Container>
    );
}
