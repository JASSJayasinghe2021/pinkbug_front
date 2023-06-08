import React, { useState, useEffect, useContext } from 'react'
import { Typography, Pagination, Divider, Box, Container, Grid, Paper, List, ListItemAvatar, ListItem, Avatar, ListItemText, Button, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from 'axios';
import { apidata, } from '../../../data/data';
import { Store } from '../../../utils/Store';
import '../../../locales/i18n'
import SearchForm from './SearchForm';
import PaymentsIcon from '@mui/icons-material/Payments';
import Add from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import Model from './Model';
import Details from './Details';
import Form from './Form';
import { Search } from "@mui/icons-material";
import { format } from 'date-fns';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';


export const Deposit = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const { id, token, user_district, location, user_roles } = state.userInfo;
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
  const [ref, setRef] = useState(0);
  const [newitem, setNewitem] = useState(false);
  const [received, setReceived] = useState(true);
  const [list, setList] = useState(false);

  const TitleTypograpy = styled(Typography)(({ theme }) => ({
    fontSize: "16px",
    color: blue[900],
    fontVariant: 'bold',
    marginTop: 10,
    marginBottom: 10
  }));

  useEffect(() => {
    fetchRecords();
  }, [ref])

  const changeContent = (val) => {
    //window.alert(val);
    switch (val) {
      case 2:
        setNewitem(false);
        setReceived(true);
        setList(false);
        break;
      case 1:
        setNewitem(true);
        setReceived(false);
        setList(false);
        break;
      case 3:
        setNewitem(false);
        setReceived(false);
        setList(true);
        break;
    }

  }


  const fetchRecords = () => {
    setLoading(true);
    axios.get(apidata.api + 'deposit', { params: { page: page, size: size, searchkey: searchkey }, headers: { "Authorization": `Bearer ${token}` } })
      .then(response => {
        console.log(response.data);
        setLoading(false);
        setRecords(response.data.rows);
        setPage(response.data.currentPage);
        setCount(response.data.count);
        setTotalpages(response.data.totalPages);
        setRef(ref+1);
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

      <Grid container>

        <Grid item sm={6} style={{ marginTop: 10, minHeight: 50, paddingBottom: '20px' }}>
          <Button style={{ marginLeft: 10, marginBottom: 0 }} variant="outlined" color="primary" onClick={() => changeContent(1)}>
            <Add style={{ marginRight: 10 }} />{t('New')}
          </Button>
          <Button style={{ marginLeft: 10, marginBottom: 0 }} variant="outlined" color="primary" onClick={() => changeContent(3)}>
            <Search style={{ marginRight: 10 }} />{t('list')}
          </Button>
        </Grid>
      </Grid>
      {newitem && <Form />}
      {
        list && <Grid container>
          <Grid item sm={12}>
            <Paper elevation={5} style={{ minHeight: 50, paddingTop: '10px', paddingRight: 10, paddingLeft: 10 }}>
              <TitleTypograpy sx={{ marginTop: 1, marginBottom: 0, fontSize: 18, variant: 'bold' }}>{t('pinkbug_deposits_list')}</TitleTypograpy>
              <Divider sx={{ marginTop: 1, marginBottom: 3, background: blue[900] }} />

              <SearchForm allpayment='all' />
            </Paper>
            <Paper elevation={5} style={{ minHeight: 600, paddingTop: 0, paddingBottom: '10px', background: '#fafafa' }}>
              <Grid container>
                <Grid item sm={12} sx={{ background: '#fff', paddingLeft: 20, paddingRight: 20 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Account</TableCell>
                        <TableCell>Reference</TableCell>
                        <TableCell align='right'>Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>

                      {records.length > 0 && records.map(x => {
                        return <>
                          <TableRow
                            key={x.id}
                            sx={{ '&:last-child td, &:last-child th': { borderBottom: 1, borderColor: '#4a9ee7' } }}
                            onClick={() => { itemClick(x) }}>
                            <TableCell>{x.id}</TableCell>
                            <TableCell>{x.nsLocationId }</TableCell>
                            <TableCell>{x.created_by}</TableCell>
                            <TableCell>{format(new Date(x.deposit_date), 'MM/dd/yyyy')}</TableCell>
                            <TableCell >{x.account_no}</TableCell>
                            <TableCell >{x.reference}</TableCell>
                            <TableCell align='right'>{x.amount}</TableCell>
                          </TableRow>
                        </>
                      })}
                    </TableBody>
                  </Table>
                </Grid>
                <Grid item sm={2}></Grid>
                <Grid item sm={8} style={{ marginTop: 10 }}>
                  <Pagination style={{ marginTop: 30 }} count={totalpages} color="secondary" page={page + 1} onChange={handlePageChange} />
                </Grid>
                <Grid item sm={2}></Grid>
              </Grid>
            </Paper>
          </Grid>

        </Grid >
      }

    </Container >
  );
};
