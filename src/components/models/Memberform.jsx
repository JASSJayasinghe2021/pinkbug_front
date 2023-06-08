import React, { useState, useEffect, useContext } from 'react';
import { Grid, Box, Button, Stack, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTranslation } from "react-i18next";
import { Save } from "@mui/icons-material";
import axios from 'axios';
import { Store } from '../../utils/Store';
import { apidata, job_roles_data } from '../../data/data';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import CancelIcon from '@mui/icons-material/Cancel';

function Memberform(props) {
    const { t, i18n } = useTranslation();
    const { state } = useContext(Store);
    const { id, token } = state.userInfo;
    const [assignee, setAssignee] = useState('');
    const [assigneeset, setAssigneeset] = useState(job_roles_data);
    const [child, setChild] = useState({
        comment: '',
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
        assignee: yup
            .object()
            .required(t('assignee_required')),
        comment: yup
            .string('')
            .required(t('comment_required')),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(kidSchema)
    });

    const handleAssigneeChange = (event) => {
        const { name, value } = event.target;
        setAssignee(value);
    
    };

    const onSubmit = (data) => {
        console.log(data);
        axios.put(apidata.api + 'edritem/assign',
            { title: data.comment, itemId: props.item.id, user_id: id, status: assignee.item_level },
            { headers: { "Authorization": `Bearer ${token}` } })
            .then(data => {
                NotificationManager.success(t('complain_assigned'), '');
                props.close();
                props.formclose();
            })
            .catch(error => {
                NotificationManager.error(t('complain_assigned_not_assigned') + error.code, '');
            })
    }

    return (
        <form id="childform" onSubmit={handleSubmit(onSubmit)}>
            <NotificationContainer />
            <Box direction='row'>
                <Stack>
                    <TitleTypograpy sx={{ marginTop: 2, marginBottom: 2 }}>{t('add_member')}</TitleTypograpy>

                    <TextField
                        sx={{
                            marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                height: 40,
                                backgroundColor: '#fff'
                            }
                        }}
                        fullWidth
                        label={t('nic')}
                        id='nic'
                        name='nic'
                        {...register('nic', { required: true })}
                        value={child.nic}
                        onChange={handleInputChange}
                        error={errors.nic}
                        helperText={errors.nic && errors.comment.nic}
                    />
                     <TextField
                        sx={{
                            marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                height: 40,
                                backgroundColor: '#fff'
                            }
                        }}
                        fullWidth
                        label={t('name')}
                        id='name'
                        name='name'
                        {...register('name', { required: true })}
                        value={child.name}
                        onChange={handleInputChange}
                        error={errors.name}
                        helperText={errors.name && errors.name}
                    />
                     <TextField
                        sx={{
                            marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                height: 40,
                                backgroundColor: '#fff'
                            }
                        }}
                        fullWidth
                        label={t('posititon')}
                        id='posititon'
                        name='posititon'
                        {...register('posititon', { required: true })}
                        value={child.posititon}
                        onChange={handleInputChange}
                        error={errors.posititon}
                        helperText={errors.posititon && errors.posititon}
                    />
                    <TextField
                        sx={{
                            marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                height: 40,
                                backgroundColor: '#fff'
                            }
                        }}
                        fullWidth
                        label={t('workplace')}
                        id='workplace'
                        name='workplace'
                        {...register('workplace', { required: true })}
                        value={child.workplace}
                        onChange={handleInputChange}
                        error={errors.workplace}
                        helperText={errors.workplace && errors.workplace}
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
                            marginLeft: 1, marginBottom: 2, backgroundColor: '#fff',"& .MuiInputBase-root": {
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
                    <FormControl >
                        <InputLabel id="demo-simple-select-label">{t('jobrole')}</InputLabel>
                        <Select
                            sx={{
                                minWidth: 200, maxHeight: 40, marginLeft: 1, marginTop: 1, marginBottom: 3, "& .MuiInputBase-root": {
                                    height: 40,
                                    backgroundColor: '#fff'
                                }
                            }}
                            fullWidth
                            labelId="demo-simple-select-label"
                            defaultValue={assignee.value_en}
                            name='jobrole'
                            id='jobrole'
                            {...register('jobrole', { required: true })}
                            error={errors.assignee}
                            helperText={errors.assignee && errors.assignee.message}
                            value={assignee.value_en}
                            onChange={handleAssigneeChange}
                        >
                            {assigneeset.map(x => {
                                return <MenuItem value={x} style={{ fontSize: 12 }}>{x.value_en}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
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

export default Memberform