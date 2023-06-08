import React, { useState, useContext, useEffect } from 'react'
import { List, ListItem, Divider, Box, Pagination, Paper, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from 'axios';
import { apidata, } from '../../../data/data';
import { Store } from '../../../utils/Store';
import '../../../locales/i18n'
import PaymentsIcon from '@mui/icons-material/Payments';
import Add from '@mui/icons-material/Add';

function RecievdList() {

    const [loading, setLoading] = useState(false);
    const [records, setRecords] = useState(false);
    const [page, setPage] = useState(false);
    const [count, setCount] = useState(false);
    const [totalpages, setTotalpages] = useState(false);
    const [size, setSize] = useState(30);
    const { state, dispatch } = useContext(Store);
    const { id, token, user_district, location, user_roles } = state.userInfo;


    useEffect(() => {
        fetchRecords();
    }, [])

    const fetchRecords = () => {
        setLoading(true);
        axios.get(apidata.api + 'inventory', { params: { page: page, size: size }, headers: { "Authorization": `Bearer ${token}` } })
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
            });
    }

    const handlePageChange = (event, value) => {
        const val = value - 1
        fetchRecords(val, size);
        setPage(val);

    }

    const itemClick=()=>{

    }

    return (
        <Box sx={{minWidth: '920px' }}>
            <Paper elevation={5} style={{ minHeight: 50, paddingTop: '0px', minWidth: '900px' }}>
                <List sx={{ width: '100%', bgcolor: 'background.paper', minWidth: '900px' }}>
                    {records.length > 0 && records.map(x => {
                        return <><ListItem alignItems="flex-start" onClick={() => { itemClick(x) }} style={{ cursor: 'pointer' }}>
                            <ListItemAvatar>
                                <Avatar>
                                    <PaymentsIcon sx={{ background: '#03366f' }} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={x.id + ' - ' + x.ns_item.title + ' - In Stock: ' + x.quantity} secondary={x.ns_location.title}></ListItemText>
                        </ListItem>
                            <Divider />
                        </>
                    })}
                    <ListItem>
                        <Pagination style={{ marginTop: 30 }} count={totalpages} color="secondary" page={page + 1} onChange={handlePageChange} />
                    </ListItem>
                </List>
            </Paper>
        </Box>
    )
}

export default RecievdList