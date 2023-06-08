import React, { useState, useEffect, useContext } from 'react';
import { Table, TableBody, Grid, Box, Button, Stack, TextField, Typography, FormControl, InputLabel, Select, MenuItem, TableHead, TableRow, TableCell } from '@mui/material';
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

function ItemsReceivedForm(props) {
    const { t, i18n } = useTranslation();
    const { state } = useContext(Store);
    const { id, token } = state.userInfo;
    const [items, setItems] = useState([]);
    const [child, setChild] = useState(props.item ? props.item : '');

    const TitleTypograpy = styled(Typography)(({ theme }) => ({
        fontSize: "16px",
        color: purple[900],
        fontVariant: 'bold',
        marginTop: 10,
        marginBottom: 10
    }));

    useEffect(() => {
        loadItems();
        return () => {

        }
    }, [])

    const loadItems = async () => {
        await axios.get(apidata.api + 'inventorylog/items', { params: { id: props.item.id }, headers: { "Authorization": `Bearer ${token}` } })
            .then(data => {
                console.log(data.data);
                setItems(data.data.data);
            }
            )
            .error(error => {
                NotificationManager.error(t('batch not found') + error.code, '');
            });
    }

    const addToInventory = () => {
        const id = props.item.id;
        const locationid = props.item.trans_to;
        axios.post(apidata.api + 'inventorylog/addtransfer',
            { id: id, locationid: locationid },
            { headers: { "Authorization": `Bearer ${token}` } })
            .then(data => {
                console.log(data)
                NotificationManager.success(t('inventory_added'), '');
                props.close()
            })
            .catch(error => {
                //NotificationManager.error(t('inventory_not_added') + error.code, '');
            })
    }

    return (
        <form >
            <Box direction='row' >
                <Stack>
                    <Grid container>
                        <Grid item xs={12}><TitleTypograpy sx={{ marginTop: 2, marginBottom: 2 }}>Id:{props.item.id + ' / '}Reference: {props.item.reference + ' / '}Transfered Date:{props.item.log_date + ' / '} From:{props.item.nsLocationId}</TitleTypograpy></Grid>
                        <Grid item xs={12}><Typography>Note:{props.item.desc}</Typography></Grid>
                        <Grid item xs={12}>
                            <Typography>Items</Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item Id</TableCell>
                                        <TableCell>Item</TableCell>
                                        <TableCell>Quantity</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items && items.map(x => {
                                        return <TableRow>
                                            <TableCell>{x.nsItemId}</TableCell>
                                            <TableCell>{x.nsBatchId} </TableCell>
                                            <TableCell>{x.quantity}</TableCell>
                                        </TableRow>
                                    })}

                                </TableBody>
                            </Table>
                        </Grid>

                        <Grid item xs={12} sx={{ marginTop: 5 }}>
                            <Button variant="contained" color="primary" onClick={addToInventory}><Save style={{ marginRight: 10 }} />{t('add')}</Button>
                        </Grid>
                    </Grid>
                </Stack>
            </Box>
        </form>
    )
}

export default ItemsReceivedForm