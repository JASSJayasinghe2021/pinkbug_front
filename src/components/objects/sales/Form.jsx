import React, { useState, useEffect, useContext } from 'react';
import { FormControl, InputLabel, Paper, Grid, Box, Button, Stack, TextField, Typography, Table, TableCell, TableRow, Select, MenuItem, Divider, TableHead, TableBody } from '@mui/material';
import { useTranslation } from "react-i18next";
import { Save } from "@mui/icons-material";
import axios from 'axios';
import { Store } from '../../../utils/Store';
import { apidata, payment_modes, accnumbers_list } from '../../../data/data';
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
    const [child, setChild] = useState(props.item ? props.item : '');
    const [items, setItems] = useState([]);
    const [paymentmode, setPaymentmode] = useState();
    const [accnumber, setAccnumber] = useState();
    const [accnumbers, setAccnumbers] = useState(accnumbers_list);
    const [paymentmodes, setPaymentmodes] = useState(payment_modes);
    const [accno, setAccno] = useState(false);


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

    const handlePaymentmodeChange = (event) => {
        const { name, value } = event.target;
        setChild((prevState) => ({
            ...prevState,
            paymentmode: value.id
        }));
        value.id== 2 ? setAccno(true) : setAccno(false);
    }

    const handleAccChange = (event) => {
        const { name, value } = event.target;
        setChild((prevState) => ({
            ...prevState,
            accnumber: value.id
        }));
    }

    const addItems = (x) => {
        //window.alert(x);
        setItems(items => [...items, x])
        //setItems(...items, x);
    }

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

    const searchCustomer = async () => {
        const whatsapp = child.whatsapp;
        console.log(whatsapp);
        await axios.get(apidata.api + 'customer/whatsapp', { params: { whatsapp: whatsapp }, headers: { "Authorization": `Bearer ${token}` } })
            .then(data => {
                console.log(data.data.data.title);
                const name = data.data.data.title;
                const id = data.data.data.id;
                const whatsapp = data.data.data.whatsapp;
                setCustDetails(name, id, whatsapp);
            }
            )
            .error(error => {
                NotificationManager.error(t('batch not found') + error.code, '');
            });
    }

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

    const custChange = (customer) => {
        const name = customer.data.data.title;
        const id = customer.data.data.id;
        const whatsapp = customer.data.data.whatsapp;
        setCustDetails(name, id, whatsapp);
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
                whatsapp: data.whatsapp,
                num_items: items.length,
                total: total,
                discount: discount,
                location: 1,
                account:data.acc_number.id,
                payment_mode:data.payment_mode.id,
                advanced_amount:0.0,
                payment_status:'RECEIVED'
            }
            console.log(payload);
            axios.post(apidata.api + 'order/new',
                { data: payload },
                { headers: { "Authorization": `Bearer ${token}` } })
                .then(data => {
                    console.log(data.data.data)
                    NotificationManager.success(t('order_completed, ') + 'Order Id: ' + data.data.data, '');
                    clearForm();
                    props.setRefVal();
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
                        <TitleTypograpy sx={{ marginTop: 1, marginBottom: 1, fontSize: 18, variant: 'bold' }}>{t('pinkbug_sales_order_new')}</TitleTypograpy>
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
                                label={t('whatsapp')}
                                id='whatsapp'
                                name='whatsapp'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                {...register('whatsapp', { required: true })}
                                value={child.whatsapp}
                                onChange={handleInputChange}
                                error={errors.whatsapp}
                                helperText={errors.whatsapp && errors.whatsapp}
                            />
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant="outlined" color="primary" onClick={searchCustomer}>
                                    <SearchIcon style={{ marginRight: 10 }} />{t('Search')}
                                </Button></Grid>
                            <Grid item xs={2}><ModelCustomer title='Customer' custChange={custChange} /></Grid>
                            <Grid item xs={4} sx={{ color: '#1565c0', marginBottom: 3, marginLeft: 4, background: '#fff590', paddingLeft: 2 }}><Typography >{'Name: ' + (child.title ? child.title : '')}</Typography></Grid>                           
                            <Grid item xs={3} sx={{ marginRight: 2 }}>
                                <FormControl>
                                    <InputLabel id="demo-simple-select-label">{t('transfer_to')}</InputLabel>
                                    <Select
                                        sx={{
                                            minWidth: 200, maxHeight: 40, marginLeft: 1, marginTop: 1, marginBottom: 2, "& .MuiInputBase-root": {
                                                height: 40,
                                                backgroundColor: '#fff'
                                            }
                                        }}
                                        labelId="demo-simple-select-label"
                                        name='payment_mode'
                                        fullWidth
                                        id='payment_mode'
                                        {...register('payment_mode', { required: true })}
                                        error={errors.payment_mode}
                                        helperText={errors.payment_mode && errors.payment_mode.message}
                                        value={paymentmode}
                                        onChange={handlePaymentmodeChange}
                                    >
                                        {paymentmodes.length > 0 && paymentmodes.map(x => {
                                            return <MenuItem value={x} style={{ fontSize: 12 }}>{x.value_en}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            {accno && <Grid item xs={3} sx={{ marginRight: 2, marginTop: 0 }}>
                            <FormControl>
                                    <InputLabel id="demo-simple-select-label">{t('transfer_to')}</InputLabel>
                                    <Select
                                        sx={{
                                            minWidth: 200, maxHeight: 40, marginLeft: 1, marginTop: 1, marginBottom: 2, "& .MuiInputBase-root": {
                                                height: 40,
                                                backgroundColor: '#fff'
                                            }
                                        }}
                                        labelId="demo-simple-select-label"
                                        name='acc_number'
                                        fullWidth
                                        id='acc_number'
                                        {...register('acc_number', { required: true })}
                                        error={errors.acc_number}
                                        helperText={errors.acc_number && errors.acc_number.message}
                                        value={accnumber}
                                        onChange={handleAccChange}
                                    >
                                        {accnumbers.length > 0 && accnumbers.map(x => {
                                            return <MenuItem value={x} style={{ fontSize: 12 }}>{x.value_en}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                
                            </Grid>}
                            <Grid item xs={10}></Grid>
                            <Grid item xs={2}>
                                <Model title='Items' addItems={addItems} />
                            </Grid>
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
                                            <TableCell>{item.item + ') ' + item.item_title + ' (' + item.desc + ')'}</TableCell>
                                            <TableCell align='right'>{item.unit_price}</TableCell>
                                            <TableCell align='right'>{item.discount}</TableCell>
                                            <TableCell align='right'>{item.quantity}</TableCell>
                                            <TableCell align='right'>{(item.unit_price * item.quantity) - (item.discount * item.quantity)}</TableCell>

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