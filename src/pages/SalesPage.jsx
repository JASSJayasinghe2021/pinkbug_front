import React, { useState, useEffect, useContext } from 'react'
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



export const SalesPage = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleTabChange = (e, tabIndex) => {
    console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
  };

  return (
    <React.Fragment>
      <Tabs value={currentTabIndex} onChange={handleTabChange} sx={{ background: '#fff' }}>
        <Tab label='Order' />
        <Tab label='Request' />
        <Tab label='Return' />
      </Tabs>
      {currentTabIndex === 0 && (
        <Sales />
      )}
      {currentTabIndex === 1 && (
        <Orderrequest />
      )}
      {currentTabIndex === 2 && (
        <ReturnItems />
      )}
    </React.Fragment>

  );
};
