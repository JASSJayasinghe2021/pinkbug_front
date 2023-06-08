import { React, useEffect } from 'react'
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { styled } from '@mui/material/styles';
import Model from './Model';

function Details(props) {
    const item=props.item;
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
                    <Model edit={true} item={props.item} refresh={props.refresh}  title='Batch' />
                </Grid>
                {false &&<Grid item sm={12} xs={12}>
                    <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', width:300}}>
                        <Avatar sx={{ width: 200, height: 200 }}>
                            {item && <img src={`/user/`+item.id+`.jpg`} width='200px' height='200px' />}
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
                <Grid container >
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
                </Grid>
                <Grid container >
                    <Grid item sm={12} xs={12}>
                        <SubTitleTypograpy sx={{}}>
                            {t('sale_unit_price')}
                        </SubTitleTypograpy>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <BodyTypograpy >
                        {item && item.sale_unit_price}
                        </BodyTypograpy>
                    </Grid>
                </Grid>
                
             
                <Grid container >
                    <Grid item sm={12} xs={12}>
                        <SubTitleTypograpy sx={{}}>
                            {t('sale_unit_discount')}
                        </SubTitleTypograpy>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <BodyTypograpy >
                        {item && item.sale_unit_discount}
                        </BodyTypograpy>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item sm={12} xs={12}>
                        <SubTitleTypograpy sx={{}}>
                            {t('nsItemId')}
                        </SubTitleTypograpy>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <BodyTypograpy >
                        {item && item.nsItemId}
                        </BodyTypograpy>
                    </Grid>
                </Grid>
            </Grid>
        </Box >
    )
}

export default Details