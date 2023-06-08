import React, { useState, useEffect, useContext } from 'react'
import { Stack, Box, Container, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import SalesDisplayBox from './containers/SalesDisplayBox';
import OrderDisplayBox from './containers/OrderDisplayBox';
import Passwordcard from './containers/Passwordcard';
import { NotificationContainer } from 'react-notifications';
import { Store } from '../utils/Store';

export const Dashboard = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const { id, workplace, username, token, user_roles, locations } = state.userInfo;
  const userrole = user_roles[0];

  useEffect(() => {
    console.log(state);
  }, []);


  return (
    <Container component="main" style={{ background: '#efefef', minHeight: '100vh' }} >
      <NotificationContainer />
      <Grid container>
        <Grid item sm={3}>
          <Box
            sx={{
              marginTop: 3,
              marginBottom: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Stack spacing={2}>
              <SalesDisplayBox /><OrderDisplayBox  />
            </Stack>
          </Box>

        </Grid>
        <Grid item sm={7}>
          <Box
            sx={{
              marginTop: 3,
              marginBottom: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Stack spacing={2}>
            </Stack>
          </Box>

        </Grid>
        <Grid item sm={2}>
          <Box
            sx={{
              marginTop: 3,
              marginBottom: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Passwordcard />
          </Box>
        </Grid>
      </Grid>

    </Container >
  );
};
