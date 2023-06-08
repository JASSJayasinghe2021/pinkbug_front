import React, { useState, useEffect, useContext } from 'react'
import { Pagination, Divider, Box, Container, Grid, Paper, List, ListItemAvatar, ListItem, Avatar, ListItemText } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NotificationContainer } from 'react-notifications';
import axios from 'axios';
import { apidata, } from '../../../data/data';
import { Store } from '../../../utils/Store';
import '../../../locales/i18n'
import SearchForm from './SearchForm';
import PaymentsIcon from '@mui/icons-material/Payments';
import { blue } from '@mui/material/colors';
import Model from './Model';
import Details from './Details';

export const Inventory = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const { id, workplace, username, token, user_roles, locations } = state.userInfo;
  const userrole = user_roles[0];
  const [item, setItem] = useState();
  const [page, setPage] = useState(0);
  const [totalpages, setTotalpages] = useState(0);
  const [count, setCount] = useState(0);
  const [isSearch, setIssearch] = useState(false);
  const [size, setSize] = useState(50);
  const [searchkey, setSearchkey] = useState('');
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [val, setVal] = useState(0);

  useEffect(() => {
    fetchRecords();
  }, [val])


  const fetchRecords = () => {
    setLoading(true);
    axios.get(apidata.api + 'inventory', { params: { page: page, size: size, searchkey: searchkey }, headers: { "Authorization": `Bearer ${token}` } })
      .then(response => {
        console.log(response.data);
        setLoading(false);
        setRecords(response.data.rows);
        setPage(response.data.currentPage);
        setCount(response.data.count);
        setTotalpages(response.data.totalPages);
      })
      .catch(err => {
        setLoading(false);
        console.log(err.message);
        //console.log(err);
        //NotificationManager.error(t(err.response.data.message) + ', Records not found', '');
      });
  }

  const handlePageChange = (event, value) => {
    const val = value - 1
    if (isSearch) {
      fetchRecords(val, size, searchkey);
    }
    else {
      fetchRecords(val, size, searchkey);
      setPage(val);
    }
  }

  const itemClick = (item) => {
    setItem(item)
  }

  const refresh = () => {
    setVal(val + 1);
  }

  return (

    <Container component="main" style={{ background: '#efefef', minHeight: '100vh' }} >
      <NotificationContainer />
      <h4 sx={{ color: '#0d47a1' }}>{t('pinkbug_inventory')}</h4>
      <Grid container>
        <Grid item sm={8}>
          <Paper elevation={5} style={{ minHeight: 50, paddingTop: '0px' }}>
            <SearchForm allpayment='all_inventory' />
          </Paper>
          <Paper elevation={5} style={{ minHeight: 600, marginTop: 20, paddingTop: '0px', paddingBottom: '10px', background: '#fafafa' }}>
            <Grid container>
              <Grid item sm={12} sx={{ marginBottom: 1 }}>
                <Model edit={false} refresh={refresh} title='Inventory Item' />
              </Grid>
              <Grid item sm={12}>
                <Box>
                  <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {records.length > 0 && records.map(x => {
                      return <><ListItem alignItems="flex-start" onClick={() => { itemClick(x) }} style={{ cursor: 'pointer' }}>
                        <ListItemAvatar>
                          <Avatar
                          >
                            <PaymentsIcon sx={{ background: '#03366f' }} />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={x.id + ' - ' + x.ns_item.title + ' - In Stock: ' + x.quantity} secondary={x.ns_location.title}></ListItemText>
                        <Model edit={true} item={x} refresh={refresh} title='Inventory In' />
                        <Model edit={true} item={x} refresh={refresh} title='Inventory Out' />
                      </ListItem>
                        <Divider />
                      </>
                    })}

                  </List>
                </Box>
              </Grid>
              <Grid item sm={2}></Grid>
              <Grid item sm={8} style={{ marginTop: 10 }}>
                <Pagination style={{ marginTop: 30 }} count={totalpages} color="secondary" page={page + 1} onChange={handlePageChange} />
              </Grid>
              <Grid item sm={2}></Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item sm={4}>
          <Paper elevation={5} style={{ backgroundColor: blue[900], color: '#ffffff', paddingLeft: '100px', paddingTop: 1, paddingBottom: 1, marginLeft: 20, minHeight: 50, marginTop: 5 }}>
            <h5>Total Inventory Records: {count}</h5>
          </Paper>
          <Paper elevation={5} style={{ marginLeft: 20, minHeight: 650, marginTop: 20, paddingTop: '0px', paddingLeft: '10px', paddingBottom: '10px', background: '#fafafa' }}>
            <Details item={item} refresh={refresh} />
          </Paper>
        </Grid>
      </Grid>
    </Container >
  );
};
