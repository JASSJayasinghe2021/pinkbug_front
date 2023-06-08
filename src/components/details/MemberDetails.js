import { React, useEffect } from 'react'
import { Button, Box, Grid, Paper, Typography, ListItemAvatar, ListItem, Avatar, ListItemText } from "@mui/material";
import { useTranslation } from "react-i18next";
import { styled } from '@mui/material/styles';
import { Edit } from "@mui/icons-material";
import Membermodel from '../models/Membermodel';

function MemberDetails(props) {
    const { t } = useTranslation();

    useEffect(() => {
    }, [props.memberid])

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
                    <Membermodel/>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <SubTitleTypograpy sx={{ marginTop: 2 }}>
                        {t('membership_id')}
                    </SubTitleTypograpy>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <BodyTypograpy >
                        10
                    </BodyTypograpy>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <SubTitleTypograpy >
                        {t('full_name')}
                    </SubTitleTypograpy>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <BodyTypograpy >
                        Jayasinghe Arachchige Samantha Jayasinghe
                    </BodyTypograpy>
                </Grid>
                <Grid container >
                    <Grid item sm={12} xs={12}>
                        <SubTitleTypograpy sx={{}}>
                            {t('initials_name')}
                        </SubTitleTypograpy>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <BodyTypograpy >
                            J.A.S.S. Jayasinghe
                        </BodyTypograpy>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item sm={12} xs={12}>
                        <SubTitleTypograpy sx={{}}>
                            {t('designation')}
                        </SubTitleTypograpy>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <BodyTypograpy >
                            Nursing Officer, Ward 31
                        </BodyTypograpy>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item sm={12} xs={12}>
                        <SubTitleTypograpy sx={{}}>
                            {t('nic')}
                        </SubTitleTypograpy>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <BodyTypograpy >
                            198115500833
                        </BodyTypograpy>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item sm={12} xs={12}>
                        <SubTitleTypograpy sx={{}}>
                            {t('salaryno')}
                        </SubTitleTypograpy>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <BodyTypograpy >
                            198115500833
                        </BodyTypograpy>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item sm={12} xs={12}>
                        <SubTitleTypograpy sx={{}}>
                            {t('permanant_address')}
                        </SubTitleTypograpy>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <BodyTypograpy >
                            61/2, Pilipothagama Rd, Badulla
                        </BodyTypograpy>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item sm={12} xs={12}>
                        <SubTitleTypograpy sx={{}}>
                            {t('tp')}
                        </SubTitleTypograpy>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <BodyTypograpy >
                            0552230224
                        </BodyTypograpy>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item sm={12} xs={12}>
                        <SubTitleTypograpy sx={{}}>
                            {t('mobile')}
                        </SubTitleTypograpy>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <BodyTypograpy >
                            0762224567
                        </BodyTypograpy>
                    </Grid>
                </Grid>
            </Grid>
        </Box >
    )
}

export default MemberDetails