import React, { useState, useEffect, useContext } from 'react';
import { Table, TableBody, TableHead, Pagination, Paper, TableRow, TableCell, Box, Button, Grid, Typography} from '@mui/material';
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

function FormItems(props) {
    const { order, close } = props;
    const { t, i18n } = useTranslation();
    const { state } = useContext(Store);
    const { id, token } = state.userInfo;
    const [loading, setLoading] = useState(false);
    const [records, setRecords] = useState([]);

    const TitleTypograpy = styled(Typography)(({ theme }) => ({
        fontSize: "16px",
        color: purple[900],
        fontVariant: 'bold',
        marginTop: 10,
        marginBottom: 10
    }));

    useEffect(() => {
        fetchRecords();
    }, [])

    const fetchRecords = () => {
        setLoading(true);
        axios.get(apidata.api + 'orderitem/order', { params: { id: order }, headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
                console.log(response.data);
                setLoading(false);
                setRecords(response.data.data);

            })
            .catch(err => {
                setLoading(false);
                console.log(err.message);
            });
    }


    return (
        <Box direction='row'>
            <Paper style={{ minHeight: 50, padding: '10px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>Item</TableCell>
                            <TableCell>Batch</TableCell>
                            <TableCell>Unit Price</TableCell>
                            <TableCell>Discount</TableCell>
                            <TableCell>Quantity</TableCell>
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
                                    <TableCell>{x.ns_batch.nsItemId}</TableCell>
                                    <TableCell>{x.ns_batch.id}</TableCell>
                                    <TableCell>{x.unit_price}</TableCell>
                                    <TableCell>{x.unit_discount}</TableCell>
                                    <TableCell>{x.quantity}</TableCell>
                                </TableRow>
                            </TableBody>
                        </>
                    })}
                </Table>
                <Grid container sx={{ marginTop: 5 }}>
                    <Grid item xs={9}></Grid>
                    <Grid item xs={2}>
                        <Button style={{ margin: 10 }} variant="contained" color="primary" onClick={close}>
                            <CancelIcon style={{ marginRight: 10 }} />{t('close')}
                        </Button>
                    </Grid>
                </Grid>
            </Paper >
        </Box>
    )
}

export default FormItems