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
import Model from './Model';

function ItemForm(props) {
    const { t, i18n } = useTranslation();
    const { state } = useContext(Store);
    const { id, token } = state.userInfo;
    const [edit, setEdit] = useState(props.edit);
    const [batch, setBatch] = useState();
    const [batches, setBatches] = useState([]);
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
        if (name == 'item') {
            loadBatches(value.trim());
        }
    };

    const itemSchema = yup.object({
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(itemSchema)
    });

    const addItems = (data) => {
        //window.alert(child.item + ' - ' + child.batch + ' - ' + child.quantity + ' - ' + child.unit_price);
        const item={
            item:child.item,
            batch:child.batch,
            quantity:child.quantity,
        }
        //event.preventDefault();
        props.addItems(item);
        props.close();
    }

    const loadBatches = async (id) => {
        await axios.get(apidata.api + 'batch/item', { params: { id: id }, headers: { "Authorization": `Bearer ${token}` } })
            .then(data => {
                console.log(data.data);
                setBatches(data.data.data);
            }
            )
            .error(error => {
                NotificationManager.error(t('batch not found') + error.code, '');
            });
    }

    const handleBatchChange = (event) => {
        const { name, value } = event.target;
        setChild((prevState) => ({
            ...prevState,
            batch: value.id
        }));
    }

    const saveClick = () => {
        props.addItems(child);
    }

    return (
        <form >
            <Box direction='row' >
                <Stack>
                    <TitleTypograpy sx={{ marginTop: 2, marginBottom: 2 }}>{t('Stock Transfer')}</TitleTypograpy>
                    <Grid container>
                        <Grid item xs={3} sx={{ marginRight: 2 }}><TextField
                            sx={{
                                marginLeft: 1, marginBottom: 2, backgroundColor: '#fff', "& .MuiInputBase-root": {
                                    height: 40,
                                    backgroundColor: '#fff'
                                }
                            }}
                            fullWidth
                            label={t('item')}
                            id='item'
                            name='item'
                            {...register('item', { required: true })}
                            value={child.item}
                            onChange={handleInputChange}
                            error={errors.item}
                            helperText={errors.item && errors.item}
                        />
                        </Grid>
                        <Grid item xs={7}>
                            <Typography>{batches[0] && batches[0].ns_item.title}</Typography>
                        </Grid>
                        <Grid item xs={7} sx={{ marginRight: 2, marginBottom: 2 }}>
                            <FormControl>
                                <InputLabel id="demo-simple-select-label">{t('batch')}</InputLabel>
                                <Select
                                    sx={{
                                        minWidth: 150, maxHeight: 40, marginLeft: 1, marginTop: 2, marginBottom: 0, "& .MuiInputBase-root": {
                                            height: 40,
                                            backgroundColor: '#fff'
                                        }
                                    }}
                                    labelId="demo-simple-select-label"
                                    name='batch'
                                    fullWidth
                                    id='batch'
                                    {...register('batch', { required: true })}
                                    error={errors.batch}
                                    helperText={errors.batch && errors.batch.message}
                                    value={batch}
                                    onChange={handleBatchChange}
                                >
                                    {batches.length > 0 && batches.map(x => {
                                        return <MenuItem value={x} style={{ fontSize: 12 }}>{x.id + ' ) ' + x.sale_unit_price}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5} sx={{ marginRight: 2 }}>
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
                        </Grid>
                        
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={addItems}><Save style={{ marginRight: 10 }} />{t('add')}</Button>
                        </Grid>
                    </Grid>
                </Stack>
            </Box>
        </form>
    )
}

export default ItemForm