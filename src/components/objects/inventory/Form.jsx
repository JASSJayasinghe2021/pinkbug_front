import React, { useState, useEffect, useContext } from 'react';
import { Grid, Box, Button, Stack, TextField, Typography} from '@mui/material';
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
            axios.post(apidata.api + 'inventory',
                { data: data },
                { headers: { "Authorization": `Bearer ${token}` } })
                .then(data => {
                    NotificationManager.success(t('inventory_item_created'), '');
                    props.close();
                })
                .catch(error => {
                    NotificationManager.error(t('inventory_item_not_created') + error.code, '');
                })
        } else {
            axios.put(apidata.api + 'inventory',
                { data: data, id: props.item.id },
                { headers: { "Authorization": `Bearer ${token}` } })
                .then(data => {
                    NotificationManager.success(t('inventory_item_updated'), '');
                    props.close();
                })
                .catch(error => {
                    NotificationManager.error(t('inventory_item_not_updated') + error.code, '');
                })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <NotificationContainer />
            <Box direction='row'>
                <Stack>
                    <TitleTypograpy sx={{ marginTop: 2, marginBottom: 2 }}>{t('add_inventory_item')}</TitleTypograpy>

                    <TextField
                        sx={{
                            marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                height: 40,
                                backgroundColor: '#fff'
                            }
                        }}
                        fullWidth
                        label={t('quantity')}
                        id='quantity'
                        name='quantity'
                        {...register('quantity', { required: true })}
                        value={child.quantity}
                        onChange={handleInputChange}
                        error={errors.quantity}
                        helperText={errors.quantity && errors.quantity}
                    />
                    <TextField
                        sx={{
                            marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                height: 40,
                                backgroundColor: '#fff'
                            }
                        }}
                        fullWidth
                        label={t('reorder_level')}
                        id='reorder_level'
                        name='reorder_level'
                        {...register('reorder_level', { required: true })}
                        value={child.reorder_level}
                        onChange={handleInputChange}
                        error={errors.reorder_level}
                        helperText={errors.reorder_level && errors.reorder_level}
                    />
                    <TextField
                        sx={{
                            marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                height: 40,
                                backgroundColor: '#fff'
                            }
                        }}
                        fullWidth
                        label={t('reorder_quantity')}
                        id='reorder_quantity'
                        name='reorder_quantity'
                        {...register('reorder_quantity', { required: true })}
                        value={child.reorder_quantity}
                        onChange={handleInputChange}
                        error={errors.reorder_quantity}
                        helperText={errors.reorder_quantity && errors.reorder_quantity}
                    />
                    <TextField
                        sx={{
                            marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                height: 40,
                                backgroundColor: '#fff'
                            }
                        }}
                        fullWidth
                        label={t('item')}
                        id='nsItemId'
                        name='nsItemId'
                        {...register('nsItemId', { required: true })}
                        value={child.nsItemId}
                        onChange={handleInputChange}
                        error={errors.nsItemId}
                        helperText={errors.nsItemId && errors.nsItemId}
                    />
                    <TextField
                        sx={{
                            marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                height: 40,
                                backgroundColor: '#fff'
                            }
                        }}
                        fullWidth
                        label={t('location')}
                        id='nsLocationId'
                        name='nsLocationId'
                        {...register('nsLocationId', { required: true })}
                        value={child.nsLocationId}
                        onChange={handleInputChange}
                        error={errors.nsLocationId}
                        helperText={errors.nsLocationId && errors.nsLocationId}
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