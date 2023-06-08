import React, { useState, useEffect, useContext } from 'react';
import { FormControl, Paper, Grid, Box, Button, Stack, TextField, Typography, Table, TableCell, TableRow, InputLabel, Select, MenuItem, Divider, TableHead, TableBody } from '@mui/material';
import { useTranslation } from "react-i18next";
import { Save } from "@mui/icons-material";
import axios from 'axios';
import { Store } from '../../../utils/Store';
import { apidata} from '../../../data/data';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import CancelIcon from '@mui/icons-material/Cancel';
import Model from './Model';
import { blue } from '@mui/material/colors';

function Form(props) {
    const { t, i18n } = useTranslation();
    const { state, dispatch } = useContext(Store);
    const { id, workplace, username, token, user_roles } = state.userInfo;
    const userrole = user_roles[0];
    const [edit, setEdit] = useState(props.edit);
    const [child, setChild] = useState(props.item ? props.item : '');
    const [items, setItems] = useState([]);
    const [locations, setLocations] = useState([]);
    const [transto, setTransto] = useState();

    useEffect(() => {
        loadLocations();
        return () => {
        }
    }, [])


    const TitleTypograpy = styled(Typography)(({ theme }) => ({
        fontSize: "16px",
        color: purple[900],
        fontVariant: 'bold',
        marginTop: 10,
        marginBottom: 10
    }));

    const addItems = (x) => {
        window.alert(x);
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

    const loadLocations = async () => {
        await axios.get(apidata.api + 'location/all', { headers: { "Authorization": `Bearer ${token}` } })
            .then(data => {
                console.log(data.data);
                setLocations(data.data.data);
            }
            )
            .error(error => {
                NotificationManager.error(t('Location not found') + error.code, '');
            });
    }

    const handleTransToChange = (event) => {
        const { name, value } = event.target;
        setChild((prevState) => ({
            ...prevState,
            transto: value.id
        }));
    }


    const onSubmit = (data) => {
        console.log(data.trans_to.id);
        if (items.length > 0) {
            const payload = {
                items: items,
                log_date: data.log_date,
                reference: data.reference,
                desc: data.desc,
                quantity: items.length,
                location: 1,
                trans_to: data.trans_to.id
            }
            axios.post(apidata.api + 'inventory/transfer',
                { data: payload },
                { headers: { "Authorization": `Bearer ${token}` } })
                .then(data => {
                    console.log(data)
                    NotificationManager.success(t('inventory_transfered'), '');
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
            <Paper elevation={5} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack>
                        <TitleTypograpy sx={{ paddingLeft: 2, paddingRight: 2, marginTop: 1, marginBottom: 0, fontSize: 18, variant: 'bold' }}>{t('pinkbug_stock_stockout_transfer')}</TitleTypograpy>
                        <Divider sx={{ marginTop: 1, marginBottom: 2, background: blue[900] }} />
                        <Grid container sx={{padding:2}}>
                            <Grid item xs={3} sx={{ marginRight: 2, marginTop: 1 }}>
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
                                    id='log_date'
                                    name='log_date'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    {...register('log_date', { required: true })}
                                    value={child.log_date}
                                    onChange={handleInputChange}
                                    error={errors.log_date}
                                    helperText={errors.log_date && errors.log_date}
                                />
                            </Grid>
                            <Grid item xs={3} sx={{ marginRight: 2, marginTop: 1 }}><TextField
                                sx={{
                                    marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                        height: 40,
                                        backgroundColor: '#fff'
                                    }
                                }}
                                fullWidth
                                date
                                label={t('reference')}
                                id='reference'
                                name='reference'
                                {...register('reference', { required: true })}
                                value={child.reference}
                                onChange={handleInputChange}
                                error={errors.reference}
                                helperText={errors.reference && errors.reference}
                            />
                            </Grid>
                            <Grid item xs={4} sx={{ marginRight: 2 }}>
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
                                        name='trans_to'
                                        fullWidth
                                        id='trans_to'
                                        {...register('trans_to', { required: true })}
                                        error={errors.trans_to}
                                        helperText={errors.trans_to && errors.trans_to.message}
                                        value={transto}
                                        onChange={handleTransToChange}
                                    >
                                        {locations.length > 0 && locations.map(x => {
                                            return <MenuItem value={x} style={{ fontSize: 12 }}>{x.title}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sx={{ marginRight: 2 }}><TextField
                                sx={{
                                    marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                        height: 40,
                                        backgroundColor: '#fff'
                                    }
                                }}
                                fullWidth
                                label={t('note')}
                                id='desc'
                                name='desc'
                                {...register('desc', { required: true })}
                                value={child.desc}
                                onChange={handleInputChange}
                                error={errors.desc}
                                helperText={errors.desc && errors.desc}
                            />
                            </Grid>
                            <Grid item xs={3}>
                                <Model title='Items' addItems={addItems} />
                            </Grid>
                        </Grid>
                        <Grid item={12} sx={{ paddingLeft: 10, paddingRight: 10 }}>
                            <Divider />
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{t('item')}</TableCell>
                                        <TableCell>{t('vendor')}</TableCell>
                                        <TableCell>{t('quantity')}</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {items && items.length > 0 && items.map((item) => {
                                        return <TableRow key={item.id}>
                                            <TableCell>{item.item}</TableCell>
                                            <TableCell>{item.batch}</TableCell>
                                            <TableCell align='right'>{item.quantity}</TableCell>

                                        </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                        </Grid>

                        <Grid container sx={{ marginTop: 5 }}>
                            <Grid item xs={8}></Grid>
                            <Grid item xs={4}>
                                <Button style={{ margin: 10, background: blue[600] }} variant="contained" color="primary" onClick={props.close}>
                                    <CancelIcon style={{ marginRight: 10 }} />{t('cancel')}
                                </Button>
                                <Button style={{ margin: 10 }} variant="contained" color="primary" type="submit">
                                    <Save style={{ marginRight: 10 }} />{t('save')}
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