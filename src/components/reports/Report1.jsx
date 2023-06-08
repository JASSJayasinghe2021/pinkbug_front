import React, { useEffect, useState } from 'react'
import { Box, Container, FormControl, Select, Button, InputLabel, TextField, MenuItem } from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';
import { useTranslation } from "react-i18next";

function Report1(props) {
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
        <center>Sales Report (Summery)</center>
      </h3>
      <h4 style={{ margin: 0, padding: 0 }}>
        <center>PinkBug</center>
      </h4>
      <p style={{ margin: 0, marginBottom: 20, padding: 0, fontSize: 12 }}>
        <center>Duration: From {props.start_date} 16:00:00 To {props.end_date} 15:59:59</center>
      </p>
      <table border={1} cellspacing="0" padding='3'>
        <thead>
          <tr>
            <th width="50%">Location</th>
            <th>Gross Sale (Rs.)</th>
            <th>Discount (Rs.)</th>
            <th>Net Sale (Rs.)</th>
          </tr>
        </thead>
        <tbody>
          {
            records && records.length > 0 && records.map(x => {
              return <tr>
                <td >{x.location}</td>
                <td align='right'>{x.gross}</td>
                <td align='right'>{x.discount}</td>
                <td align='right'>{x.net}</td></tr>
            })
          }
          <tr><td colSpan='3'>Total Net Sales</td><td align='right'></td></tr>
        </tbody>
      </table>
    </>
  )
}

export default Report1