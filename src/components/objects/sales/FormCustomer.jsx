import React, { useState, useEffect, useContext } from 'react';
import { Grid, Box, Button, Stack, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
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

function FormCustomer(props) {
    const { t, i18n } = useTranslation();
    const { state } = useContext(Store);
    const { id, token } = state.userInfo;
    const [child, setChild] = useState('');

    const TitleTypograpy = styled(Typography)(({ theme }) => ({
        fontSize: "16px",
        color: purple[900],
        fontVariant: 'bold',
        marginTop: 10,
        marginBottom: 10
    }));

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setChild((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const customerSchema = yup.object({
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(customerSchema)
    });

    const onSubmit = (data) => {
        axios.post(apidata.api + 'customer',
            { data: data },
            { headers: { "Authorization": `Bearer ${token}` } })
            .then(data => {
                NotificationManager.success(t('customer_created'), '');
                props.close(data);
            }).catch(error => {
                NotificationManager.error(t('customer_not_created') + error.code, '');
            })
    }

    return (
        <form id="childform" onSubmit={handleSubmit(onSubmit)}>
            <NotificationContainer />
            <Box direction='row'>
                <Stack>
                    <TitleTypograpy sx={{ marginTop: 2, marginBottom: 2 }}>{t('add_customer')}</TitleTypograpy>

                    <TextField
                        sx={{
                            marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                height: 40,
                                backgroundColor: '#fff'
                            }
                        }}
                        fullWidth
                        label={t('title')}
                        id='title'
                        name='title'
                        {...register('title', { required: true })}
                        value={child.title}
                        onChange={handleInputChange}
                        error={errors.title}
                        helperText={errors.title && errors.title}
                    />
                    <TextField
                        sx={{
                            marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                height: 40,
                                backgroundColor: '#fff'
                            }
                        }}
                        fullWidth
                        label={t('contry')}
                        id='country'
                        name='country'
                        {...register('country', { required: true })}
                        value={child.country}
                        onChange={handleInputChange}
                        error={errors.country}
                        helperText={errors.country && errors.country}
                    />
                    <TextField
                        sx={{
                            marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                height: 40,
                                backgroundColor: '#fff'
                            }
                        }}
                        fullWidth
                        label={t('address')}
                        id='address'
                        name='address'
                        {...register('address', { required: true })}
                        value={child.address}
                        onChange={handleInputChange}
                        error={errors.address}
                        helperText={errors.address && errors.address}
                    />
                    <TextField
                        sx={{
                            marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                height: 40,
                                backgroundColor: '#fff'
                            }
                        }}
                        fullWidth
                        label={t('email')}
                        id='email'
                        name='email'
                        {...register('email', { required: true })}
                        value={child.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        helperText={errors.email && errors.email}
                    />
                    <TextField
                        sx={{
                            marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                height: 40,
                                backgroundColor: '#fff'
                            }
                        }}
                        fullWidth
                        label={t('password')}
                        id='password'
                        name='password'
                        {...register('password', { required: true })}
                        value={child.password}
                        onChange={handleInputChange}
                        error={errors.password}
                        helperText={errors.password && errors.password}
                    />
                    <TextField
                        sx={{
                            marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                height: 40,
                                backgroundColor: '#fff'
                            }
                        }}
                        fullWidth
                        label={t('mobile')}
                        id='mobile'
                        name='mobile'
                        {...register('mobile', { required: true })}
                        value={child.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                        helperText={errors.mobile && errors.mobile}
                    />
                    <TextField
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
                        {...register('whatsapp', { required: true })}
                        value={child.whatsapp}
                        onChange={handleInputChange}
                        error={errors.whatsapp}
                        helperText={errors.whatsapp && errors.whatsapp}
                    />
                    <Grid container>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={8}>
                            <Button style={{ margin: 10 }} variant="contained" color="primary" onClick={props.close}>
                                <CancelIcon style={{ marginRight: 10 }} />{t('cancel')}
                            </Button>
                            <Button style={{ margin: 10 }} variant="contained" color="primary" type="submit">
                                <Save style={{ marginRight: 10 }} />{t('save')}
                            </Button>
                        </Grid>
                    </Grid>

                </Stack>
            </Box>
        </form>
    )
}

export default FormCustomer