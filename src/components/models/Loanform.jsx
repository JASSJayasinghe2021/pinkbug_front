import React, { useState, useEffect, useContext } from 'react';
import { Grid, Box, Button, Stack, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTranslation } from "react-i18next";
import { Save } from "@mui/icons-material";
import axios from 'axios';
import { Store } from '../../utils/Store';
import { apidata, assignee_data, category_data, district_data } from '../../data/data';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import CancelIcon from '@mui/icons-material/Cancel';

function Loanform(props) {
    const { t, i18n } = useTranslation();
    const { state } = useContext(Store);
    const { id, token } = state.userInfo;
    const [assignee, setAssignee] = useState('');
    const [displaydistrict, setDisplaydistrict] = useState(false)
    const [district, setDistrict] = useState('');
    const [districtset, setDistrictset] = useState(district_data);
    const [assigneeset, setAssigneeset] = useState(assignee_data);
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
        if (value.id === 2) {
            setDisplaydistrict(true);
        }
    };
    const handleDistrictChange = (event) => {
        const { name, value } = event.target;
        setDistrict(value);
    };

    const onSubmit = (data) => {
        console.log(data);
        axios.put(apidata.api + 'edritem/assign',
            { title: data.comment, itemId: props.item.id, user_id: id, status: assignee.item_level, district_id: displaydistrict ? district.id : 0 },
            { headers: { "Authorization": `Bearer ${token}` } })
            .then(data => {
                setDisplaydistrict(false)
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
                    <TitleTypograpy sx={{ marginTop: 2, marginBottom: 2 }}>{t('assign_complain')}</TitleTypograpy>

                    <FormControl >
                        <InputLabel id="demo-simple-select-label">{t('category')}</InputLabel>
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
                            name='assignee'
                            id='assignee'
                            {...register('assignee', { required: true })}
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

                    {displaydistrict &&
                        <FormControl >
                            <InputLabel id="demo-simple-select-label">{t('edr_district')}</InputLabel>
                            <Select
                                sx={{
                                    minWidth: 200, maxHeight: 40, marginLeft: 1, marginTop: 1, marginBottom: 3, "& .MuiInputBase-root": {
                                        height: 40,
                                        backgroundColor: '#fff'
                                    }
                                }}
                                fullWidth
                                labelId="demo-simple-select-label"
                                defaultValue={district.value_en}
                                name='district'
                                id='district'
                                {...register('district', { required: true })}
                                value={district.value_en}
                                onChange={handleDistrictChange}
                            >
                                {districtset.map(x => {
                                    return <MenuItem value={x} style={{ fontSize: 12 }}>{x.value_en}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    }
                    <TextField
                        sx={{
                            marginLeft: 1, marginBottom: 1, backgroundColor: '#fff',
                        }}
                        multiline
                        minRows={5}
                        maxRows={5}
                        fullWidth
                        label={t('comment')}
                        id='comment'
                        name='comment'
                        {...register('comment', { required: true })}
                        value={child.comment}
                        onChange={handleInputChange}
                        error={errors.comment}
                        helperText={errors.comment && errors.comment.message}
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

export default Loanform