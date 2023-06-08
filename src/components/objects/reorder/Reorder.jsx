import React, { useState, useEffect, useContext } from 'react'
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Pagination, Divider, Container, Grid, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NotificationContainer } from 'react-notifications';
import axios from 'axios';
import { apidata, } from '../../../data/data';
import { Store } from '../../../utils/Store';
import '../../../locales/i18n'
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

export const Reorder = () => {
    const { t } = useTranslation();
    const { state, dispatch } = useContext(Store);
    const { id, workplace, username, token, user_roles, locations } = state.userInfo;
    const userrole = user_roles[0];
    const [item, setItem] = useState();
    const [page, setPage] = useState(0);
    const [totalpages, setTotalpages] = useState(0);
    const [count, setCount] = useState(0);
    const [isSearch, setIssearch] = useState(false);
    const [size, setSize] = useState(50);
    const [searchkey, setSearchkey] = useState('');
    const [loading, setLoading] = useState(false);
    const [records, setRecords] = useState([]);
    const [val, setVal] = useState(0);
    const [newitem, setNewitem] = useState(false);
    const [received, setReceived] = useState(true);
    const [list, setList] = useState(false);

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

    const changeContent = (val) => {
        //window.alert(val);
        switch (val) {
            case 2:
                setNewitem(false);
                setReceived(true);
                setList(false);
                break;
            case 1:
                setNewitem(true);
                setReceived(false);
                setList(false);
                break;
            case 3:
                setNewitem(false);
                setReceived(false);
                setList(true);
                break;
        }

    }


    const fetchRecords = () => {
        setLoading(true);
        axios.get(apidata.api + 'inventory/reorder', { params: { page: page, size: size, searchkey: searchkey }, headers: { "Authorization": `Bearer ${token}` } })
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
                //console.log(err);
                //NotificationManager.error(t(err.response.data.message) + ', Records not found', '');
            });
    }

    const handlePageChange = (event, value) => {
        const val = value - 1
        if (isSearch) {
            fetchRecords(val, size, searchkey);
        }
        else {
            fetchRecords(val, size, searchkey);
            setPage(val);
        }
    }

    const itemClick = (item) => {
        setItem(item)
    }

    const refresh = () => {
        setVal(val + 1);
    }

    return (

        <Container component="main" style={{ background: '#efefef', minHeight: '100vh' }} >
            <NotificationContainer />

            <Grid container>
                <Grid item sm={12}>


                    <Paper elevation={5} style={{ minHeight: 600, marginTop: 10, paddingTop: 10, paddingBottom: '10px', background: '#fafafa' }}>

                        <Grid container>
                            <Grid item sm={12} sx={{ background: '#fff' }}>
                                <TitleTypograpy sx={{ margin: 2, marginBottom: 0, fontSize: 18, variant: 'bold' }}>{t('pinkbug_stock_stockout_list')}</TitleTypograpy>
                                <Divider sx={{ marginTop: 1, marginBottom: 3, background: blue[900] }} />
                            </Grid>
                            <Grid item sm={12} sx={{ background: '#fff' }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>id</TableCell>
                                            <TableCell>Item</TableCell>
                                            <TableCell>Location</TableCell>
                                            <TableCell>Current Quantity</TableCell>
                                            <TableCell>Reorder Level</TableCell>
                                            <TableCell>Reorder Quantity</TableCell>
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
                                                    <TableCell>{x.ns_item.title}</TableCell>
                                                    <TableCell >{x.ns_location.title}</TableCell>
                                                    <TableCell >{x.quantity}</TableCell>
                                                    <TableCell >{x.reorder_level}</TableCell>
                                                    <TableCell >{x.reorder_quantity}</TableCell>
                                                </TableRow>
                                            </>
                                        })}
                                    </TableBody>
                                </Table>
                            </Grid>
                            <Grid item sm={2}></Grid>
                            <Grid item sm={8} style={{ marginTop: 10 }}>
                                <Pagination style={{ marginTop: 30 }} count={totalpages} color="secondary" page={page + 1} onChange={handlePageChange} />
                            </Grid>
                            <Grid item sm={2}></Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

        </Container >
    );
};
