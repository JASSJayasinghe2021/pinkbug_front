import React, { useState, useEffect, useContext } from 'react'
import {  Table, TableHead, TableBody, TableRow, TableCell, Pagination, Container, Grid, Paper, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NotificationContainer } from 'react-notifications';
import axios from 'axios';
import { apidata, } from '../../../data/data';
import { Store } from '../../../utils/Store';
import '../../../locales/i18n'
import SearchForm from './SearchForm';
import Add from '@mui/icons-material/Add';
import ModelReceivedList from './ModelReceivedList';
import Form from './Form';
import { Search } from "@mui/icons-material";
import Form1 from './Form1';
import { format } from 'date-fns';

export const StockOut = () => {
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
  const [newitem, setNewitem] = useState(false);
  const [received, setReceived] = useState(true);
  const [list, setList] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, [val])

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
    axios.get(apidata.api + 'inventory/orderout', { params: { page: page, size: size, searchkey: searchkey }, headers: { "Authorization": `Bearer ${token}` } })
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

      <Grid container>
        <Grid item sm={12} style={{ minHeight: 50, paddingBottom: '20px' }}>
          <Grid container>
            <Grid item sm={5}>
              <Button style={{ marginLeft: 10, marginBottom: 0, marginTop: 10 }} variant="outlined" color="primary" onClick={() => changeContent(2)}>
                <Add style={{ marginRight: 10 }} />{t('Remove')}
              </Button>
              <Button style={{ marginLeft: 10, marginBottom: 0, marginTop: 10 }} variant="outlined" color="primary" onClick={() => changeContent(1)}>
                <Add style={{ marginRight: 10 }} />{t('Transfer')}
              </Button>
              <Button style={{ marginLeft: 10, marginBottom: 0, marginTop: 10 }} variant="outlined" color="primary" onClick={() => changeContent(3)}>
                <Search style={{ marginRight: 10 }} />{t('list')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {received && <Form1/>}
        {newitem && <Form />
        }
      </Grid>
      {
        list && <Grid container>
          <Grid item sm={12}>
            <Paper elevation={5} style={{ minHeight: 50, paddingTop: '0px' }}>
              <SearchForm allpayment='all' />
            </Paper>
            <Paper elevation={5} style={{ minHeight: 600, paddingTop: 0, paddingBottom: '10px', background: '#fafafa' }}>
              <Grid container>
                <Grid item sm={12} sx={{ background: '#fff' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>Reference</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Location To</TableCell>
                        <TableCell>Location From</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell align='right'>Total Value</TableCell>
                        <TableCell ></TableCell>
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
                            <TableCell>{x.reference}</TableCell>
                            <TableCell>{x.trans_type}</TableCell>
                            <TableCell>{x.status}</TableCell>
                            <TableCell>{x.trans_to==0?x.nsLocationId:x.trans_to}</TableCell>
                            <TableCell>{x.nsLocationId}</TableCell>
                            <TableCell>{format(new Date(x.log_date), 'MM/dd/yyyy')}</TableCell>
                            <TableCell align='right'>{x.total_value}</TableCell>
                            <TableCell ><ModelReceivedList title='Items' order={x.id}/></TableCell>
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
        </Grid>
      }

    </Container >
  );
};
