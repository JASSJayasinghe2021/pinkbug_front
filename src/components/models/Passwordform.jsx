import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";
import { Save } from "@mui/icons-material";
import axios from 'axios';
import { Store } from '../../utils/Store';
import { apidata, category_data, severity_data } from '../../data/data';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import CancelIcon from '@mui/icons-material/Cancel';

function Passwordform(props) {
    const { t, i18n } = useTranslation();
    const { state } = useContext(Store);
    const { id, token } = state.userInfo;
    const [child, setChild] = useState({
        linkwith: '',
        linkwith: '',
        linkwith: '',
        linkwith: '',
    });

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

    const kidSchema = yup.object({
        otp: yup
            .string(6)
            .required(t('otp_required')),
        currpassword: yup
            .string(100)
            .required(t('current_password_required')),
        newpassword: yup
            .string(100)
            .required(t('new_password_required')),
        renewpassword: yup
            .string(100)
            .required(t('re_enter_password')),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(kidSchema)
    });

    const onSubmit = (data) => {
        axios.put(apidata.api + 'user/changepw', {
            otp: data.otp,
            currpassword: data.currpassword,
            newpassword: data.newpassword,
            userId: id
        }, { headers: { "Authorization": `Bearer ${token}` } })
            .then(data => {
                NotificationManager.success(t('password_changed'), '');
                props.formclose();
            })
            .catch(error => {
                NotificationManager.error(t('error_data_save - ' + error.response.data.message), '');
                console.log(error);
            })
    }


    return (
        <Box>
            <NotificationContainer />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    <Grid item sm={12}><TitleTypograpy sx={{ marginTop: 2, marginBottom: 2 }}>{t('change_password')}</TitleTypograpy></Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            sx={{
                                marginTop: 1, marginRight: 10, marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                    height: 40,
                                    backgroundColor: '#fff'
                                }
                            }}
                            label={t('otp')}
                            id='otp'
                            name='otp'
                            value={child.otp}
                            {...register('otp', { required: true })}
                            onChange={handleInputChange}
                            error={errors.otp}
                            helperText={errors.otp && errors.otp.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            sx={{
                                marginTop: 1, marginRight: 10, marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                    height: 40,
                                    backgroundColor: '#fff'
                                }
                            }}
                            label={t('current_password')}
                            id='currpassword'
                            name='currpassword'
                            value={child.currpassword}
                            {...register('currpassword', { required: true })}
                            onChange={handleInputChange}
                            error={errors.currpassword}
                            helperText={errors.currpassword && errors.currpassword.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            sx={{
                                marginTop: 1, marginRight: 10, marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                    height: 40,
                                    backgroundColor: '#fff'
                                }
                            }}
                            label={t('new_password')}
                            id='newpassword'
                            name='newpassword'
                            value={child.newpassword}
                            {...register('newpassword', { required: true })}
                            onChange={handleInputChange}
                            error={errors.newpassword}
                            helperText={errors.newpassword && errors.newpassword.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            sx={{
                                marginTop: 1, marginRight: 10, marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                    height: 40,
                                    backgroundColor: '#fff'
                                }
                            }}
                            label={t('re_new_password')}
                            id='renewpassword'
                            name='renewpassword'
                            value={child.renewpassword}
                            {...register('renewpassword', { required: true })}
                            onChange={handleInputChange}
                            error={errors.renewpassword}
                            helperText={errors.renewpassword && errors.renewpassword.message}
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <Button style={{ margin: 10 }} variant="contained" color="primary" onClick={props.formclose}>
                            <CancelIcon style={{ marginRight: 10 }} />{t('cancel')}
                        </Button>
                        <Button style={{ margin: 10 }} variant="contained" color="primary" type="submit">
                            <Save style={{ marginRight: 10 }} />{t('save')}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default Passwordform