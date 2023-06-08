import React, { useState } from 'react'
import { Vendor } from '../components/objects/vendors/Vendor';
import { Customer } from '../components/objects/customer/Customer';
import { Location } from '../components/objects/location/Location';
import { Item } from '../components/objects/item/Item';
import { Batch } from '../components/objects/batch/Batch';
import { Inventory } from '../components/objects/inventory/Inventory';
import { Tab, Tabs } from "@mui/material";

export const AdmininstrationPage = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleTabChange = (e, tabIndex) => {
    console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
  };

  return (
    <React.Fragment>
      <Tabs value={currentTabIndex} onChange={handleTabChange} sx={{background:'#fff'}}>
        <Tab label='Vendor' />
        <Tab label='Customer' />
        <Tab label='Location' />
        <Tab label='Item' />
        <Tab label='Batch' />
        <Tab label='Inventory' />
      </Tabs>
      {currentTabIndex === 0 && (
        <Vendor />
      )}
      {currentTabIndex === 1 && (
        <Customer />
      )}
      {currentTabIndex === 2 && (
        <Location />
      )}
      {currentTabIndex === 3 && (
        <Item />
      )}
       {currentTabIndex === 4 && (
        <Batch />
      )}
       {currentTabIndex === 5 && (
        <Inventory />
      )}
    </React.Fragment>

  );
};
