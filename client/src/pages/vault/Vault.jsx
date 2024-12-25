import './Vault.css';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import {
    Container, Typography, Divider, TextField, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, Tooltip
} from '@mui/material';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// import PopupPin from './PopupPin';
import AddVault from './AddVault';
import UpdateVault from './UpdateVault';
import DeleteVault from './DeleteVault';
import AuthProvider from '../../middleware/AuthProvider';
import { useLoading } from '../../components/loading/useLoading';

export default function Vault() {
    const firstLogin = false;
    const { http } = AuthProvider();
    const { setLoading } = useLoading();
    const [openPin, setOpenPin] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [vaultData, setVaultData] = useState([]);
    const [currentId, setCurrentId] = useState(null);
    const [updateData, setUpdateData] = useState(null);
    const [deleteData, setDeleteData] = useState(null);

    const handleFetch = async (offSet, pageSize) => {
        try {
            setLoading(true);
            const response = await http.post('/vaults', { offSet, pageSize });
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
            data.key = localStorage.getItem('svPin');
            const response = await http.post('/vault/add', data);
            toast.success(response.data.message);
            localStorage.removeItem("localVault");
        } catch (error) {
            console.error(error);
            if (error.response) { toast.error(error.response.data.message); }
            else { toast.error('Something went wrong!'); }
        } finally { setLoading(false); }
    }

    const handleUpdate = async (data) => {
        try {
            setLoading(true);
            data.key = localStorage.getItem('svPin');
            const response = await http.patch(`/vault/update`, data);
            toast.success(response.data.message);
            localStorage.removeItem("localVault");
        } catch (error) {
            console.error(error);
            if (error.response) { toast.error(error.response.data.message); }
            else { toast.error('Something went wrong!'); }
        } finally { setLoading(false); }
    }

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            const response = await http.delete(`/vault/delete?id=${id}`);
            toast.success(response.data.message);
            localStorage.removeItem("localVault");
        } catch (error) {
            console.error(error);
            if (error.response) { toast.error(error.response.data.message); }
            else { toast.error('Something went wrong!'); }
        } finally { setLoading(false); }
    }

    useEffect(() => {
        const localVault = JSON.parse(localStorage.getItem('localVault'));
        if (localVault) { setVaultData(localVault); }
        else { handleFetch(0, 10); }
    }, []);

    return (
        <Container maxWidth="lg">
            {/* {openPin && <PopupPin openPin={openPin} setOpenPin={setOpenPin} data={handleFetch} />} */}
            {openAdd && <AddVault openAdd={openAdd} setOpenAdd={setOpenAdd} data={handleAdd} />}
            {(updateData !== null) && <UpdateVault updateData={updateData} setUpdateData={setUpdateData} data={handleUpdate} />}
            {(deleteData !== null) && <DeleteVault deleteData={deleteData} setDeleteData={setDeleteData} data={handleDelete} />}

            <Grid container justifyContent="space-between" alignItems="center" mt={3} spacing={2}>
                <Grid size={{ xs: 12, md: 6 }} textAlign={{ xs: 'center', md: 'left' }}>
                    <Typography pt={2} variant="h4" gutterBottom>
                        Your Secure Data 🔒
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
                        />
                        <Button variant='contained' color='primary' onClick={() => setOpenAdd(true)}
                            sx={{ paddingX: 3, whiteSpace: 'nowrap', backgroundColor: '#1976d2' }}
                        >
                            Add New
                        </Button>
                    </div>
                </Grid>
            </Grid>

            <Divider sx={{ marginY: 2 }} />

            {firstLogin || (vaultData.length == 0) ? (
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
                <TableContainer component={Paper} sx={{ marginY: 2 }}>
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
                            {vaultData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className='vault-table-cell'>{index + 1}</TableCell>
                                    <TableCell className='vault-table-cell'>{item.title}</TableCell>
                                    <TableCell className='vault-table-cell'>{item.username}</TableCell>
                                    <TableCell className='vault-table-cell'>
                                        {currentId == item._id ? (
                                            <>{item.password}</>
                                        ) : (
                                            <Tooltip title="Show Password" arrow sx={{ cursor: 'pointer' }}>
                                                <VisibilityOffIcon color="primary" onClick={() => setCurrentId(item._id)} />
                                            </Tooltip>
                                        )}
                                    </TableCell>
                                    <TableCell className='vault-table-cell'>
                                        {new Date(item.updatedAt).toDateString()}<br />
                                        {new Date(item.updatedAt).toLocaleTimeString()}
                                    </TableCell>
                                    <TableCell className='vault-table-cell'>
                                        <Tooltip title="Edit Password" arrow sx={{ cursor: 'pointer' }} onClick={() => setUpdateData(item)}>
                                            <EditIcon color="primary" />
                                        </Tooltip>
                                        &nbsp;&nbsp;
                                        <Tooltip title="Edit Password" arrow sx={{ cursor: 'pointer' }} onClick={() => setDeleteData(item._id)}>
                                            <DeleteForeverIcon color="error" />
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
}
