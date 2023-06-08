import React, { useState} from 'react'
import { StockIn } from '../components/objects/stockin/StockIn'
import { Tab, Tabs } from "@mui/material";
import { StockOut } from '../components/objects/stockout/StockOut';
import {Reorder} from '../components/objects/reorder/Reorder';



export const StockPage = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleTabChange = (e, tabIndex) => {
    console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
  };

  return (
    <React.Fragment>
      <Tabs value={currentTabIndex} onChange={handleTabChange} sx={{ background: '#fff' }}>
        <Tab label='Stock In' />
        <Tab label='Stock Out' />
        <Tab label='Reorder' />
      </Tabs>
      {currentTabIndex === 0 && (
        <StockIn />
      )}
      {currentTabIndex === 1 && (
        <StockOut />
      )}
      {currentTabIndex === 2 && (
        <Reorder />
      )}
    </React.Fragment>

  );
};
