/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import {
    Container, Typography, Divider, TextField, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, Tooltip, Card,
} from '@mui/material';
import { toast } from 'react-toastify';
import debounce from 'lodash.debounce';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import './Vault.css';
import VaultAdd from './VaultAdd';
import VaultUpdate from './VaultUpdate';
import VaultDelete from './VaultDelete';
import { useAuth } from '../../hooks/useAuth';
import { useLoading } from '../../hooks/useLoading';


// Component to display user vault
export default function Vault() {
    document.title = 'SecureVault | Vault';

    const { http } = useAuth();
    const { setLoading } = useLoading();
    const [openAdd, setOpenAdd] = useState(false);
    const [vaultData, setVaultData] = useState([]);
    const [decrypted, setDecrypted] = useState('');
    const [currentId, setCurrentId] = useState(null);
    const [updateData, setUpdateData] = useState(null);
    const [deleteData, setDeleteData] = useState(null);
    const [tempLoading, setTempLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { return; }
        const localVault = JSON.parse(localStorage.getItem('localVault'));
        if (localVault) { setVaultData(localVault); }
        else { handleFetch(0, 100); }
    }, []);

    const handleFetch = async (offSet, pageSize) => {
        try {
            setLoading(true);
            const response = await http.post('/vault/fetch', { offSet, pageSize });
            localStorage.setItem('localVault', JSON.stringify(response.data));
            setVaultData(response.data);
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
            const response = await http.post('/vault/add', data);
            toast.success(response.data.message);
            await handleFetch(0, 100);
            setOpenAdd(false);
        } catch (error) {
            console.error(error);
            if (error.response) { toast.error(error.response.data.message); }
            else { toast.error('Something went wrong!'); }
        } finally { setLoading(false); }
    }

    const preHandleUpdate = async (data) => {
        if (currentId == data._id) {
            data.password = decrypted;
            setUpdateData(data);
        } else {
            data.password = await handleDecrypt(data._id);
            setUpdateData(data);
        }
    }

    const handleUpdate = async (data) => {
        try {
            setLoading(true);
            data.key = localStorage.getItem('eKey');
            const response = await http.patch(`/vault/update`, data);
            toast.success(response.data.message);
            await handleFetch(0, 100);
            setUpdateData(null);
            setCurrentId(null);
        } catch (error) {
            console.error(error);
            if (error.response) { toast.error(error.response.data.message); }
            else { toast.error('Something went wrong!'); }
        } finally { setLoading(false); }
    }

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await http.delete(`/vault/delete/${id}`);
            toast.success("Vault deleted successfully!");
            await handleFetch(0, 100);
            setDeleteData(null);
        } catch (error) {
            console.error(error);
            if (error.response) { toast.error(error.response.data.message); }
            else { toast.error('Something went wrong!'); }
        } finally { setLoading(false); }
    }

    const handleDecrypt = async (id) => {
        try {
            setDecrypted('');
            setCurrentId(id);
            setTempLoading(true);
            const response = await http.post(`/vault/${id}`, { key: localStorage.getItem('eKey') });
            setDecrypted(atob(response.data));
            setTimeout(() => { setDecrypted(''); setCurrentId(null); }, 6000);
            return atob(response.data);
        } catch (error) {
            console.error(error);
            if (error.response) { toast.error(error.response.data.message); }
            else { toast.error('Something went wrong!'); }
        } finally { setTempLoading(false); }
    }

    const handleSearch = (value) => {
        const localVault = JSON.parse(localStorage.getItem('localVault'));
        if (value === '') { setVaultData(localVault); }
        else {
            const filteredData = localVault.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()));
            setVaultData(filteredData);
        }
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Text has been copied to clipboard!');
    }

    return (
        <Container maxWidth="lg">
            {openAdd && <VaultAdd openAdd={openAdd} setOpenAdd={setOpenAdd} data={handleAdd} />}
            {(updateData !== null) && <VaultUpdate updateData={updateData} setUpdateData={setUpdateData} data={handleUpdate} />}
            {(deleteData !== null) && <VaultDelete deleteData={deleteData} setDeleteData={setDeleteData} data={handleDelete} />}

            <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                <Grid size={{ xs: 12, md: 6 }} textAlign={{ xs: 'center', md: 'left' }}>
                    <Typography pt={2} variant="h4" gutterBottom>
                        Your Secured Passwords 🔒
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

            {(vaultData.length == 0) ? (
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                    <Typography variant="h6">
                        No Passwords available. Please add new records.
                    </Typography>
                    <Button variant='contained' onClick={() => setOpenAdd(true)}
                        sx={{ paddingX: 3, whiteSpace: 'nowrap', backgroundColor: '#1976d2', marginTop: 2 }}>
                        + Add New Password
                    </Button>
                </div>
            ) : (
                <Card raised sx={{ padding: 2, marginTop: 2, backgroundColor: '#f5f5f5' }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#659ed8' }}>
                                    <TableCell className='vault-table-header'>#</TableCell>
                                    <TableCell className='vault-table-header'>Title</TableCell>
                                    <TableCell className='vault-table-header'>Username</TableCell>
                                    <TableCell className='vault-table-header'>Password</TableCell>
                                    <TableCell className='vault-table-header'>Last Updated</TableCell>
                                    <TableCell className='vault-table-header'>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {vaultData.map((data, index) => (
                                    <TableRow key={data._id}>
                                        <TableCell className='vault-table-cell'>{index + 1}</TableCell>
                                        <TableCell className='vault-table-cell'>{data.title}</TableCell>
                                        <TableCell className='vault-table-cell'>
                                            <Tooltip arrow title="Click to Copy Username" onClick={() => copyToClipboard(data.username)}>
                                                <span className='imp-text'>{data.username}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell className="vault-table-cell">
                                            {currentId === data._id && !tempLoading ?
                                                <Tooltip arrow title="Click to Copy Password" onClick={() => copyToClipboard(decrypted)}>
                                                    <span className='imp-text'>{decrypted}</span>
                                                </Tooltip> :
                                                <Tooltip arrow title="Decrypt Password (Auto-Hides in 5s)">
                                                    <Button variant='outlined' loading={tempLoading && currentId === data._id}
                                                        onClick={() => handleDecrypt(data._id)}>
                                                        Reveal <LockOpenIcon />
                                                    </Button>
                                                </Tooltip>
                                            }
                                        </TableCell>
                                        <TableCell className='vault-table-cell'>
                                            {new Date(data.updatedAt).toDateString()}<br />
                                            {new Date(data.updatedAt).toLocaleTimeString()}
                                        </TableCell>
                                        <TableCell className='vault-table-cell'>
                                            <Tooltip title="Edit Password" arrow sx={{ cursor: 'pointer' }} onClick={() => preHandleUpdate(data)}>
                                                <EditIcon color="primary" />
                                            </Tooltip>
                                            &nbsp;&nbsp;
                                            <Tooltip title="Delete Password" arrow sx={{ cursor: 'pointer' }} onClick={() => setDeleteData(data._id)}>
                                                <DeleteForeverIcon color="error" />
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            )}
        </Container>
    );
}
