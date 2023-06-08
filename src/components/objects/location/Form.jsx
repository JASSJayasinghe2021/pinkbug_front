import React, { useState, useContext } from 'react';
import { Grid, Box, Button, Stack, TextField, Typography } from '@mui/material';
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

function Form(props) {
    const { t, i18n } = useTranslation();
    const { state, dispatch } = useContext(Store);
    const { id, workplace, username, token, user_roles, locations } = state.userInfo;
    const userrole = user_roles[0];
    const [edit, setEdit] = useState(props.edit);
    const [child, setChild] = useState(props.item ? props.item : '');

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

    const itemSchema = yup.object({
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(itemSchema)
    });

    const onSubmit = (data) => {
        if (!edit) {
            axios.post(apidata.api + 'location',
                { data: data },
                { headers: { "Authorization": `Bearer ${token}` } })
                .then(data => {
                    NotificationManager.success(t('location_created'), '');
                    props.close();
                })
                .catch(error => {
                    NotificationManager.error(t('location_not_created') + error.code, '');
                })
        } else {
            axios.put(apidata.api + 'location',
                { data: data, id: props.item.id },
                { headers: { "Authorization": `Bearer ${token}` } })
                .then(data => {
                    NotificationManager.success(t('location_updated'), '');
                    props.close();
                })
                .catch(error => {
                    NotificationManager.error(t('location_not_updated') + error.code, '');
                })
        }
    }

    return (
        <form id="childform" onSubmit={handleSubmit(onSubmit)}>
            <NotificationContainer />
            <Box direction='row'>
                <Stack>
                    <TitleTypograpy sx={{ marginTop: 2, marginBottom: 2 }}>{t('add_location')}</TitleTypograpy>

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
                        id='contry'
                        name='contry'
                        {...register('contry', { required: true })}
                        value={child.contry}
                        onChange={handleInputChange}
                        error={errors.contry}
                        helperText={errors.contry && errors.contry}
                    />
                    <TextField
                        sx={{
                            marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                height: 40,
                                backgroundColor: '#fff'
                            }
                        }}
                        fullWidth
                        label={t('city')}
                        id='city'
                        name='city'
                        {...register('city', { required: true })}
                        value={child.city}
                        onChange={handleInputChange}
                        error={errors.city}
                        helperText={errors.city && errors.city}
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
                    <TextField
                        sx={{
                            marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                height: 40,
                                backgroundColor: '#fff'
                            }
                        }}
                        fullWidth
                        label={t('shop_type')}
                        id='shop_type'
                        name='shop_type'
                        {...register('shop_type', { required: true })}
                        value={child.shop_type}
                        onChange={handleInputChange}
                        error={errors.shop_type}
                        helperText={errors.shop_type && errors.shop_type}
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

export default Form