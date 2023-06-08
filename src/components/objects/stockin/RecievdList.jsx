import React, { useState, useContext, useEffect } from 'react'
import { Typography, Table, TableBody, TableRow, TableCell, Divider, Box, Pagination, Paper, TableHead } from '@mui/material';
import axios from 'axios';
import { apidata, } from '../../../data/data';
import { Store } from '../../../utils/Store';
import '../../../locales/i18n'
import ModelReceived from './ModelReceived';
import { styled } from '@mui/material/styles';
import { blue} from '@mui/material/colors';
import { useTranslation } from "react-i18next";

function RecievdList() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [records, setRecords] = useState(false);
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(false);
    const [totalpages, setTotalpages] = useState(false);
    const [size, setSize] = useState(30);
    const { state, dispatch } = useContext(Store);
    const { id, workplace, username, token, user_roles, locations } = state.userInfo;
    const userrole = user_roles[0];
    const [val, setVal] = useState(0);

    const TitleTypograpy = styled(Typography)(({ theme }) => ({
        fontSize: "16px",
        color: blue[900],
        fontVariant: 'bold',
        marginTop: 10,
        marginBottom: 10
      }));



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
        setVal(val + 1);
    }

    return (
        <Box sx={{ minWidth: '920px' }}>
            <Paper elevation={5} style={{ minHeight: 50, padding: '2px', minWidth: '900px' }}>
                <TitleTypograpy sx={{ margin: 2, marginBottom: 0, fontSize: 18, variant: 'bold' }}>{t('pinkbug_stock_stockin_received')}</TitleTypograpy>
                <Divider sx={{ marginTop: 1, marginBottom: 3, background: blue[900] }} />

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>Note</TableCell>
                            <TableCell>Reference</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.length > 0 && records.map(x => {
                            return <>


                                <TableRow
                                    key={x.id}
                                    sx={{ '&:last-child td, &:last-child th': { borderBottom: 1, borderColor: '#4a9ee7' } }}
                                >
                                    <TableCell>{x.id}</TableCell>
                                    <TableCell>{x.desc}</TableCell>
                                    <TableCell>{x.reference}</TableCell>
                                    <TableCell sx={{ maxWidth: '10px' }}><ModelReceived title='View' item={x} setval={chengeVal} /></TableCell>
                                </TableRow>

                            </>
                        })}
                    </TableBody>
                </Table>
                <Pagination style={{ marginTop: 30 }} count={totalpages} color="secondary" page={page + 1} onChange={handlePageChange} />
            </Paper >
        </Box >
    )
}

export default RecievdList