import React, { useState, useEffect, useContext } from 'react';
import { FormControl, Paper, Grid, Box, Button, Stack, TextField, Typography, Table, TableCell, TableRow, InputLabel, Select, MenuItem, Divider, TableHead, TableBody } from '@mui/material';
import { useTranslation } from "react-i18next";
import { Save } from "@mui/icons-material";
import axios from 'axios';
import { Store } from '../../../utils/Store';
import { apidata, accnumbers_list, job_roles_data, district_data } from '../../../data/data';
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
    const [accnumber, setAccnumber] = useState();
    const [accnumbers, setAccnumbers] = useState(accnumbers_list);


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

    const handleAccChange = (event) => {
        const { name, value } = event.target;
        setChild((prevState) => ({
            ...prevState,
            accnumber: value.id
        }));
    }

    const itemSchema = yup.object({
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(itemSchema)
    });

    const clearForm = () => {
        setChild('');
        setItems([]);
    }

    const addItems = () => {

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
        const payload = {
            deposit_date: data.deposit_date,
            account_no: data.account_no.id,
            reference: data.reference,
            amount: data.amount,
            status: 'DEPOSIT',
            deposit_date: data.deposit_date,
            created_by: 1,
            nsLocationId: 1
        }
        console.log(payload);
        axios.post(apidata.api + 'deposit',
            { data: payload },
            { headers: { "Authorization": `Bearer ${token}` } })
            .then(data => {
                console.log(data.data.data)
                NotificationManager.success(t('Deposit added, ') + 'Deposit Id: ' + data.data.data, '');
                clearForm();
            })
            .catch(error => {
                //NotificationManager.error(t('inventory_not_added') + error.code, '');
            })
    }

    return (
        <Box direction='row'>
            <NotificationContainer />
            <Paper elevation={5} sx={{ maxWidth: 900, minHeight: 50, paddingLeft: 3, paddingTop: 0, paddingRight: 2 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack>
                        <TitleTypograpy sx={{ marginTop: 1, marginBottom: 1, fontSize: 18, variant: 'bold' }}>{t('pinkbug_deposit_new')}</TitleTypograpy>
                        <Divider sx={{ marginBottom: 3, background: blue[900] }} />
                        <Grid container>
                            <Grid item xs={2} sx={{ marginRight: 2 }}>
                                <TextField
                                    sx={{
                                        marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                            height: 40,
                                            backgroundColor: '#fff'
                                        }
                                    }}
                                    fullWidth
                                    type="date"
                                    label={t('Date')}
                                    id='deposit_date'
                                    name='deposit_date'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    {...register('deposit_date', { required: true })}
                                    value={child.deposit_date}
                                    onChange={handleInputChange}
                                    error={errors.deposit_date}
                                    helperText={errors.deposit_date && errors.deposit_date}
                                />
                            </Grid>

                            <Grid item xs={3} sx={{ marginRight: 2 }}>
                                <FormControl>
                                    <InputLabel id="demo-simple-select-label">{t('deposited_to')}</InputLabel>
                                    <Select
                                        sx={{
                                            minWidth: 200, maxHeight: 40, marginLeft: 1, marginTop: 0, marginBottom: 2, "& .MuiInputBase-root": {
                                                height: 40,
                                                backgroundColor: '#fff'
                                            }
                                        }}
                                        labelId="demo-simple-select-label"
                                        name='account_no'
                                        fullWidth
                                        id='account_no'
                                        {...register('account_no', { required: true })}
                                        error={errors.acc_number}
                                        helperText={errors.account_no && errors.account_no.message}
                                        value={accnumber}
                                        onChange={handleAccChange}
                                    >
                                        {accnumbers.length > 0 && accnumbers.map(x => {
                                            return <MenuItem value={x} style={{ fontSize: 12 }}>{x.value_en}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3} sx={{ marginRight: 2 }}>
                                <TextField
                                    sx={{
                                        marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                            height: 40,
                                            backgroundColor: '#fff'
                                        }
                                    }}
                                    fullWidth
                                    label={t('reference')}
                                    id='reference'
                                    name='reference'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    {...register('reference', { required: true })}
                                    value={child.reference}
                                    onChange={handleInputChange}
                                    error={errors.reference}
                                    helperText={errors.reference && errors.reference}
                                />
                            </Grid>

                            <Grid item xs={2} sx={{ marginRight: 2 }}>
                                <TextField
                                    sx={{
                                        marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                            height: 40,
                                            backgroundColor: '#fff'
                                        }
                                    }}
                                    fullWidth
                                    label={t('amount')}
                                    id='amount'
                                    name='amount'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    {...register('amount', { required: true })}
                                    value={child.amount}
                                    onChange={handleInputChange}
                                    error={errors.amount}
                                    helperText={errors.amount && errors.amount}
                                />
                            </Grid>


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