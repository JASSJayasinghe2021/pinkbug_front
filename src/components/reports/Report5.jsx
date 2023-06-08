import React, { useEffect, useState } from 'react'
import { Box, Container, FormControl, Select, Button, InputLabel, TextField, MenuItem } from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';
import { useTranslation } from "react-i18next";

function Report5(props) {
  const { t } = useTranslation();
  const [records, setRecords] = useState([]);
  useEffect(() => {
    console.log(props.data);
    setRecords(props.data);
    return () => {
    }
  }, [])

  return (
    <>
      <Button variant="outlined" color="primary" type="submit"  >
        <ArticleIcon style={{ marginRight: 10 }} />{t('pdf')}
      </Button>
      <h3 style={{ margin: 0, marginTop: 60, padding: 0 }}>
        <center>Inventory Report</center>
      </h3>
      <h4 style={{ margin: 0, padding: 0 }}>
        <center>PinkBug</center>
      </h4>
      <p style={{ margin: 0, marginBottom: 20, padding: 0, fontSize: 12 }}>
        <center>Date: {Date.now()}</center>
      </p>
      <table border={1} cellspacing="0" padding='3'>
        <thead>
          <tr>
            <th width="20%">Location</th>
            <th width="20%">Item</th>
            <th>Reorder Level</th>
            <th>Reorder Quantity</th>
            <th>Current Quantity</th>
          </tr>
        </thead>
        <tbody>
          {
            records && records.length > 0 && records.map(x => {
              return <tr>
                <td>{x.item}</td>
                <td>{x.location}</td>
                <td align='right'>{x.reorder_level}</td>
                <td align='right'>{x.reorder_quantity}</td>
                <td align='right'>{x.quantity}</td></tr>
            })
          }
          <tr><td colSpan='4'>Total Items</td><td align='right'></td></tr>
        </tbody>
      </table>
    </>
  )
}

export default Report5