import React, { useState, useEffect, useContext } from 'react'
import { Button, Divider, Stack, Box, Container, Grid, Paper, List, ListItemAvatar, ListItem, Avatar, ListItemText } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from 'axios';
import { apidata, } from '../data/data';
import { Store } from '../utils/Store';
import '../locales/i18n';
import SearchForm from '../components/forms/SearchForm';
//import { Search, Add } from "@mui/icons-material";
import MemberDetails from '../components/details/MemberDetails';
import { blue } from '@mui/material/colors';
import Membermodel from '../components/models/Membermodel';

export const MemberPage = () => {
  const { t } = useTranslation();
  const [memberid, setMemberid]=useState(1);

  const itemClick = () => {
    window.alert(memberid);
    setMemberid(memberid+1);
  }

  return (
    <Container component="main" style={{ background: '#efefef', minHeight: '100vh' }} >
      <NotificationContainer />
      <h4 sx={{color:'#0d47a1'}}>{t('NCFBadulla_Members')}</h4>
      <Grid container>
        <Grid item sm={8}>
          <Paper elevation={5} style={{ minHeight: 50,  paddingTop: '0px' }}>
            <SearchForm allpayment='all_members'/>
          </Paper>
          <Paper elevation={5} style={{ minHeight: 600, marginTop: 20, paddingTop: '0px', paddingBottom: '10px', background: '#fafafa' }}>
            <Grid container>
              <Grid item sm={12}>
                <Membermodel/>
              </Grid>
              <Grid item sm={12}>

                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  <ListItem alignItems="flex-start" onClick={() => { itemClick() }} style={{ cursor: 'pointer' }}>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          backgroundColor: '#ffaaff',
                        }}
                      >
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary='J.A. Priyantha Jayasinghe' secondary='Nusrsing Officer, Ward 31' />
                  </ListItem>
                  <Divider />
                </List>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item sm={4}>
          <Paper elevation={5} style={{ backgroundColor: blue[900], color:'#ffffff', paddingLeft: '100px', paddingTop: 1, paddingBottom: 1, marginLeft: 20, minHeight: 50, marginTop: 5 }}>
            <h5>Total Members: 250</h5>
          </Paper>
          <Paper elevation={5} style={{ marginLeft: 20, minHeight: 650, marginTop: 20, paddingTop: '0px', paddingLeft: '10px', paddingBottom: '10px', background: '#fafafa' }}>
          <MemberDetails memberid={memberid}/>
          </Paper>
        </Grid>
      </Grid>
    </Container >
  );
};
