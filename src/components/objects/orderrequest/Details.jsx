import { React, useEffect } from 'react'
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { styled } from '@mui/material/styles';
import Model from './Model';

function Details(props) {
    const item = props.item;
    const { t } = useTranslation();


    useEffect(() => {
    }, [props.item])

    const SubTitleTypograpy = styled(Typography)(({ theme }) => ({
        fontSize: "16px",
        color: '#0d47a1',
        paddingLeft: 4,
        marginTop: 1
    }));

    const BodyTypograpy = styled(Typography)(({ theme }) => ({
        fontSize: "14px",
        color: '#5a5a5a',
        paddingLeft: 4,
        marginBottom: 10,
        marginTop: 1
    }));


    return (

        <Box sx={{ minWidth: 700 }}>
            <Grid container >
                <Grid item sm={12}>
                    <Model edit={true} item={props.item} refresh={props.refresh} title='Inventory Item' />
                </Grid>
                {false && <Grid item sm={12} xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 300 }}>
                        <Avatar sx={{ width: 200, height: 200 }}>
                            {item && <img src={`/user/` + item.id + `.jpg`} width='200px' height='200px' />}
                        </Avatar>
                    </Box>
                </Grid>}
                <Grid item sm={12} xs={12}>
                    <SubTitleTypograpy sx={{ marginTop: 2 }}>
                        {t('id')}
                    </SubTitleTypograpy>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <BodyTypograpy >
                        {item && item.id}
                    </BodyTypograpy>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <SubTitleTypograpy sx={{}}>
                        {t('item')}
                    </SubTitleTypograpy>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <BodyTypograpy >
                        {item && item.ns_item.title}
                    </BodyTypograpy>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <SubTitleTypograpy sx={{}}>
                        {t('location')}
                    </SubTitleTypograpy>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <BodyTypograpy >
                        {item && item.ns_location.title}
                    </BodyTypograpy>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <SubTitleTypograpy sx={{ marginTop: 2 }}>
                        {t('quantity')}
                    </SubTitleTypograpy>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <BodyTypograpy >
                        {item && item.quantity}
                    </BodyTypograpy>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <SubTitleTypograpy >
                        {t('reorder_level')}
                    </SubTitleTypograpy>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <BodyTypograpy >
                        {item && item.reorder_level}
                    </BodyTypograpy>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <SubTitleTypograpy >
                        {t('reorder_quantity')}
                    </SubTitleTypograpy>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <BodyTypograpy >
                        {item && item.reorder_quantity}
                    </BodyTypograpy>
                </Grid>

                <Grid item sm={12} xs={12}>
                    <SubTitleTypograpy sx={{}}>
                        {t('status')}
                    </SubTitleTypograpy>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <BodyTypograpy >
                        {item && item.status}
                    </BodyTypograpy>
                </Grid>
            </Grid>
        </Box >
    )
}

export default Details