import React, { useState, useEffect, useContext } from 'react';
import { Paper, Grid, Box, Button, Stack, TextField, Typography, Table, TableCell, TableRow, InputLabel, Select, MenuItem, Divider, TableHead, TableBody } from '@mui/material';
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
import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ModelCustomer from './ModelCustomer';
import Model from './Model';
import { blue } from '@mui/material/colors';

function Form(props) {
    const { t, i18n } = useTranslation();
    const { state } = useContext(Store);
    const { id, token } = state.userInfo;
    const [edit, setEdit] = useState(props.edit);
    const [child, setChild] = useState(props.item ? props.item : '');
    const [items, setItems] = useState([]);


    useEffect(() => {
        return () => {
        }
    }, [])

    const TitleTypograpy = styled(Typography)(({ theme }) => ({
        fontSize: "18px",
        color: blue[900],
        fontVariant: 'bold',
        marginTop: 10,
    }));

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setChild((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const itemSchema = yup.object({
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(itemSchema)
    });

    const clearForm = () => {
        setChild('');
        setItems([]);
    }

    const addItems = ()=>{

    }

    const searchOrder = async () => {
        const orderid = child.order_id;
        console.log(orderid);
        await axios.get(apidata.api + 'orderitem/order', { params: { id: orderid }, headers: { "Authorization": `Bearer ${token}` } })
            .then(data => {
                setItems(data.data.data);
                console.log(data.data.data);
            }
            )
            .error(error => {
                NotificationManager.error(t('batch not found') + error.code, '');
            });
    }

    /** 
    const setCustDetails = (name, id, whatsapp) => {
        setChild((prevState) => ({
            ...prevState,
            ['whatsapp']: whatsapp ? whatsapp : ''
        }));
        setChild((prevState) => ({
            ...prevState,
            ['title']: name ? name : ''
        }));
        setChild((prevState) => ({
            ...prevState,
            ['id']: id ? id : ''
        }));
    }
    */

    const custChange = (customer) => {
        //const name = customer.data.data.title;
        const id = customer.data.data.id;
        //const whatsapp = customer.data.data.whatsapp;
        //setCustDetails(name, id, whatsapp);
    }

    const calculatetotal = () => {
        let total = 0.0;
        items.map(item => {
            total = parseFloat(total) + (parseFloat(item.unit_price) * parseFloat(item.quantity));
        })
        return total;
    }

    const calculateDiscount = () => {
        let discount = 0.0;
        items.map(item => {
            discount = parseFloat(discount) + (parseFloat(item.discount) * parseFloat(item.quantity));
        })
        return discount;
    }

    const onSubmit = (data) => {
        if (items.length > 0) {
            const total = calculatetotal();
            const discount = calculateDiscount();
            const payload = {
                items: items,
                //whatsapp: data.whatsapp,
                num_items: items.length,
                total: total,
                discount: discount,
                location: 1
            }
            console.log(payload);
            axios.post(apidata.api + 'order/new',
                { data: payload },
                { headers: { "Authorization": `Bearer ${token}` } })
                .then(data => {
                    console.log(data.data.data)
                    NotificationManager.success(t('order_completed, ') + 'Order Id: ' + data.data.data, '');
                    clearForm();
                })
                .catch(error => {
                    //NotificationManager.error(t('inventory_not_added') + error.code, '');
                })
        } else {
            NotificationManager.error(t('Please_add _atleast_one_item'), '');
        }
    }

    return (
        <Box direction='row'>
            <NotificationContainer />
            <Paper elevation={5} sx={{ maxWidth: 900, minHeight: 50, paddingLeft: 3, paddingTop: 0, paddingRight: 2 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack>
                        <TitleTypograpy sx={{ marginTop: 1, marginBottom: 1, fontSize: 18, variant: 'bold' }}>{t('pinkbug_sales_return_new')}</TitleTypograpy>
                        <Divider sx={{ marginBottom: 3, background: blue[900] }} />
                        <Grid container>
                            <Grid item xs={3} sx={{ marginRight: 2 }}><TextField
                                sx={{
                                    marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                        height: 40,
                                        backgroundColor: '#fff'
                                    }
                                }}
                                fullWidth
                                label={t('order_id')}
                                id='order_id'
                                name='order_id'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                {...register('order_id', { required: true })}
                                value={child.order_id}
                                onChange={handleInputChange}
                                error={errors.order_id}
                                helperText={errors.order_id && errors.order_id}
                            />
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant="outlined" color="primary" onClick={searchOrder}>
                                    <SearchIcon style={{ marginRight: 10 }} />{t('Search')}
                                </Button></Grid>
                            <Grid item xs={9} sx={{ color: '#1565c0', marginLeft: 4, background: '#fff590', paddingLeft: 2 }}><Typography >Order ID:{' ' + (child.id ? child.id : '') }</Typography></Grid>
                            <Grid item xs={10}></Grid>
                         
                        </Grid>
                        <Grid item xs={12} sx={{ paddingTop: 2, paddingLeft: 10, paddingRight: 10 }}>
                            <Divider />
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ minWidth: 200 }}>{t('item')}</TableCell>
                                        <TableCell align='right'>{t('unit_price')}</TableCell>
                                        <TableCell align='right'>{t('discount')}</TableCell>
                                        <TableCell align='right'>{t('quantity')}</TableCell>
                                        <TableCell align='right'>{t('cost')}</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {items && items.length > 0 && items.map((item) => {
                                        return <TableRow key={item.id}>
                                            <TableCell>{+ item.ns_batch.nsItemId}</TableCell>
                                            <TableCell align='right'>{item.unit_price}</TableCell>
                                            <TableCell align='right'>{item.unit_discount}</TableCell>
                                            <TableCell align='right'>{item.quantity}</TableCell>
                                            <TableCell align='right'>{(item.unit_price * item.quantity) - (item.unit_discount * item.quantity)}</TableCell>

                                        </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                        </Grid>

                        <Grid container sx={{ marginTop: 5 }}>
                            <Grid item xs={8}></Grid>
                            <Grid item xs={4}>
                                <Button style={{ margin: 10, background: blue[600] }} variant="contained" onClick={props.close}>
                                    <CancelIcon style={{ marginRight: 10 }} />{t('cancel')}
                                </Button>
                                <Button style={{ margin: 10 }} variant="contained" color="primary" type="submit">
                                    <Save style={{ marginRight: 10 }} />{t('Complete')}
                                </Button>
                            </Grid>
                        </Grid>
                    </Stack>
                </form>
            </Paper>
        </Box>

    )
}

export default Form