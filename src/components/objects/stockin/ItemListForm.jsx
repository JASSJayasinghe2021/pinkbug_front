import React, { useState, useEffect, useContext } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Grid, Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTranslation } from "react-i18next";
import { Save } from "@mui/icons-material";
import axios from 'axios';
import { Store } from '../../../utils/Store';
import { apidata, assignee_data, job_roles_data, district_data } from '../../../data/data';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import CancelIcon from '@mui/icons-material/Cancel';
import Model from './Model';

function ItemListForm(props) {
    const { t, i18n } = useTranslation();
    const { state } = useContext(Store);
    const { id, token } = state.userInfo;
    const [records, setRecords] = useState([]);
    const [batch, setBatch] = useState();
    const [batches, setBatches] = useState([]);
    const [child, setChild] = useState(props.item ? props.item : '');

    const TitleTypograpy = styled(Typography)(({ theme }) => ({
        fontSize: "16px",
        color: purple[900],
        fontVariant: 'bold',
        marginTop: 10,
        marginBottom: 10
    }));

    useEffect(() => {
        loadItems(props.order);
    }, [])


    const loadItems = async (id) => {
        await axios.get(apidata.api + 'inventorylog/items', { params: { id: id }, headers: { "Authorization": `Bearer ${token}` } })
            .then(data => {
                console.log(data.data);
                setRecords(data.data.data);
            }
            )
            .error(error => {
                NotificationManager.error(t('batch not found') + error.code, '');
            });
    }

    return (

        <Box direction='row'>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>nsItemId</TableCell>
                        <TableCell>nsBatchId</TableCell>
                        <TableCell>recived_unit_price</TableCell>
                        <TableCell>quantity</TableCell>
                        <TableCell>total_value</TableCell>
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
                                <TableCell>{x.nsBatchId}</TableCell>
                                <TableCell>{x.recived_unit_price}</TableCell>
                                <TableCell>{x.quantity}</TableCell>
                                <TableCell>{x.total_value}</TableCell>
                            </TableRow>
                        </>
                    })}
                </TableBody>
            </Table>
            <Grid container sx={{marginTop:10}}>
                <Grid item sm={10}></Grid>
                <Grid item sm={2}>
                    <Button variant="contained" color="primary" onClick={props.close}><CancelIcon style={{ marginRight: 10 }} />{t('close')}</Button>
                </Grid>
            </Grid>

        </Box>

    )
}

export default ItemListForm