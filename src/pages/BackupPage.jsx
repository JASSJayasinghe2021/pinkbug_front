import React, { useState, useEffect, useContext } from 'react'
import { Stack, Box, Container, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from 'axios';
import { apidata, } from '../data/data';
import { Store } from '../utils/Store';
import '../locales/i18n';

export const BackupPage = () => {
  const { t } = useTranslation();
  return (
    <Container component="main" style={{ background: '#efefef', minHeight: '100vh' }} >
      <NotificationContainer />
      <Grid container>
        <Grid item sm={10}>
          <h1>Backup</h1>
        </Grid>
        <Grid item sm={2}>

        </Grid>
      </Grid>
    </Container >
  );
};
