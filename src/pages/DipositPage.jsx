import React, { useState, useEffect, useContext } from 'react';
import { Container, Grid, Box, Button, Stack, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import { Vendor } from '../components/objects/vendors/Vendor';
import { Customer } from '../components/objects/customer/Customer';
import { Location } from '../components/objects/location/Location';
import { Item } from '../components/objects/item/Item';
import { Batch } from '../components/objects/batch/Batch';
import { Inventory } from '../components/objects/inventory/Inventory';
import { Tab, Tabs } from "@mui/material";
import { Sales } from '../components/objects/sales/Sales';
import { Orderrequest } from '../components/objects/orderrequest/Orderrequest';
import { ReturnItems } from '../components/objects/return/ReturnItems';
import Form from '../components/objects/deposit/Form';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Deposit } from '../components/objects/deposit/Deposit';


export const DipositPage = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleTabChange = (e, tabIndex) => {
    console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
  };

  return (
    <>
     <Deposit/>
    </>

  );
};
