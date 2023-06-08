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

function Form(props) {
    const { t, i18n } = useTranslation();
    const { state } = useContext(Store);
    const { id, token } = state.userInfo;
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
            axios.post(apidata.api + 'item',
                { data: data },
                { headers: { "Authorization": `Bearer ${token}` } })
                .then(data => {
                    NotificationManager.success(t('item_created'), '');
                    props.close();
                })
                .catch(error => {
                    NotificationManager.error(t('item_not_created') + error.code, '');
                })
        } else {
            axios.put(apidata.api + 'item',
                { data: data, id: props.item.id },
                { headers: { "Authorization": `Bearer ${token}` } })
                .then(data => {
                    NotificationManager.success(t('item_updated'), '');
                    props.close();
                })
                .catch(error => {
                    NotificationManager.error(t('item_not_updated') + error.code, '');
                })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <NotificationContainer />
            <Box direction='row'>
                <Stack>
                    <TitleTypograpy sx={{ marginTop: 2, marginBottom: 2 }}>{t('add_item')}</TitleTypograpy>

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
                        label={t('desc')}
                        id='desc'
                        name='desc'
                        {...register('desc', { required: true })}
                        value={child.desc}
                        onChange={handleInputChange}
                        error={errors.desc}
                        helperText={errors.desc && errors.desc}
                    />
                    <TextField
                        sx={{
                            marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                height: 40,
                                backgroundColor: '#fff'
                            }
                        }}
                        fullWidth
                        label={t('category')}
                        id='category'
                        name='category'
                        {...register('category', { required: true })}
                        value={child.category}
                        onChange={handleInputChange}
                        error={errors.category}
                        helperText={errors.category && errors.category}
                    />
                    <TextField
                        sx={{
                            marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                height: 40,
                                backgroundColor: '#fff'
                            }
                        }}
                        fullWidth
                        label={t('material')}
                        id='material'
                        name='material'
                        {...register('material', { required: true })}
                        value={child.material}
                        onChange={handleInputChange}
                        error={errors.material}
                        helperText={errors.material && errors.material}
                    />
                    <TextField
                        sx={{
                            marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                height: 40,
                                backgroundColor: '#fff'
                            }
                        }}
                        fullWidth
                        label={t('size')}
                        id='size'
                        name='size'
                        {...register('size', { required: true })}
                        value={child.size}
                        onChange={handleInputChange}
                        error={errors.size}
                        helperText={errors.size && errors.size}
                    />
                    <TextField
                        sx={{
                            marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                height: 40,
                                backgroundColor: '#fff'
                            }
                        }}
                        fullWidth
                        label={t('color')}
                        id='color'
                        name='color'
                        {...register('color', { required: true })}
                        value={child.color}
                        onChange={handleInputChange}
                        error={errors.color}
                        helperText={errors.color && errors.color}
                    />
                    <TextField
                        sx={{
                            marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                height: 40,
                                backgroundColor: '#fff'
                            }
                        }}
                        fullWidth
                        label={t('nsVendorId')}
                        id='nsVendorId'
                        name='nsVendorId'
                        {...register('nsVendorId', { required: true })}
                        value={child.nsVendorId}
                        onChange={handleInputChange}
                        error={errors.nsVendorId}
                        helperText={errors.nsVendorId && errors.nsVendorId}
                    />
                    <TextField
                        sx={{
                            marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                height: 40,
                                backgroundColor: '#fff'
                            }
                        }}
                        fullWidth
                        label={t('status')}
                        id='status'
                        name='status'
                        {...register('status', { required: true })}
                        value={child.status}
                        onChange={handleInputChange}
                        error={errors.status}
                        helperText={errors.status && errors.status}
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