import React, { useState, useContext, useEffect } from 'react'
import { Table, TableBody, TableRow, TableCell, List, ListItem, Divider, Box, Pagination, Paper, ListItemAvatar, Avatar, ListItemText, TableHead } from '@mui/material';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from 'axios';
import { apidata, } from '../../../data/data';
import { Store } from '../../../utils/Store';
import '../../../locales/i18n'
import PaymentsIcon from '@mui/icons-material/Payments';
import Add from '@mui/icons-material/Add';
import ModelReceived from './ModelReceived';

function RecievdList() {

    const [loading, setLoading] = useState(false);
    const [records, setRecords] = useState(false);
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(false);
    const [totalpages, setTotalpages] = useState(false);
    const [size, setSize] = useState(30);
    const { state, dispatch } = useContext(Store);
    const [val, setVal] = useState(0);
    const { id, token, user_district, location, user_roles } = state.userInfo;



    useEffect(() => {
        fetchRecords();
    }, [val])

    const fetchRecords = () => {
        setLoading(true);
        axios.get(apidata.api + 'inventory/transfer', { params: { page: page, size: size }, headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
                console.log(response.data);
                setLoading(false);
                setRecords(response.data.rows);
                setPage(response.data.currentPage);
                setCount(response.data.count);
                setTotalpages(response.data.totalPages);
            })
            .catch(err => {
                setLoading(false);
                console.log(err.message);
            });
    }

    const handlePageChange = (event, value) => {
        const val = value - 1
        fetchRecords(val, size);
        setPage(val);

    }

    const chengeVal = () => {
        setVal(val+1);
    }

    return (
        <Box sx={{ minWidth: '920px' }}>
            <Paper elevation={5} style={{ minHeight: 50, padding: '20px', minWidth: '900px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>Note</TableCell>
                            <TableCell>Reference</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    {records.length > 0 && records.map(x => {
                        return <>

                            <TableBody>
                                <TableRow
                                    key={x.id}
                                    sx={{ '&:last-child td, &:last-child th': { borderBottom: 1, borderColor: '#4a9ee7' } }}
                                >
                                    <TableCell>{x.id}</TableCell>
                                    <TableCell>{x.desc}</TableCell>
                                    <TableCell>{x.reference}</TableCell>
                                    <TableCell sx={{ maxWidth: '10px' }}><ModelReceived title='View' item={x} setval={chengeVal} /></TableCell>
                                </TableRow>
                            </TableBody>
                        </>
                    })}
                </Table>
                <Pagination style={{ marginTop: 30 }} count={totalpages} color="secondary" page={page + 1} onChange={handlePageChange} />
            </Paper >
        </Box >
    )
}

export default RecievdList