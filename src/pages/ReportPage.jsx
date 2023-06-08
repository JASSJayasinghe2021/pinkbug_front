import React, { useEffect, useState, useContext } from 'react'
import { Box, Container, FormControl, Select, Button, InputLabel, TextField, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Store } from '../utils/Store';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { apidata, report_type_data, locationset } from '../data/data';
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Spinner from '../components/items/Spinner';
import Report1 from '../components/reports/Report1';
import Report2 from '../components/reports/Report2';
import Report3 from '../components/reports/Report3';
import Report4 from '../components/reports/Report4';
import Report5 from '../components/reports/Report5';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfFonts from "pdfmake/build/vfs_fonts";
import html2canvas from "html2canvas";
import PdfViewer from '../components/items/PdfViewer';

export const ReportPage = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const { id, workplace, username, token, user_roles, locations } = state.userInfo;
  const userrole = user_roles[0];
  const [categoryies, setCategoryies] = useState(state.categories);
  const navigate = useNavigate();
  const [report, setReport] = useState('');
  const [reportset, setReportset] = useState(report_type_data);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [filepath, setFilepath] = useState();
  const [child, setChild] = useState({
    start_date: '',
    end_date: '',
  });
  const [report1, setReport1] = useState(false);
  const [report2, setReport2] = useState(false);
  const [report3, setReport3] = useState(false);
  const [report4, setReport4] = useState(false);
  const [report5, setReport5] = useState(false);
  const [reportdata, setReportdata] = useState([]);

  useEffect(() => {

  }, [])


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setChild((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleReportChange = (event) => {
    const { name, value } = event.target;
    setReport(value);
  }

  const handleLocationChange = (event) => {
    const { name, value } = event.target;
    setLocation(value);
  }

  const formSchema = yup.object({
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(formSchema)
  });

  const setContent = (val) => {

  }


  const onSubmit = async (data) => {
    setLoading(true);
    const { start_date, end_date, location, report } = data;
    const repdata = {
      start_date: start_date,
      end_date: end_date,
      location: location,
      report: report
    }
    const reportnum = report.id;
    await axios.post(apidata.api + 'report/id', {
      data: repdata
    }, { headers: { "Authorization": `Bearer ${token}` } })
      .then(data => {
        setReportdata([]);
        setLoading(false);
        console.log(data.data.data);
        setReportdata(data.data.data);
      })
      .catch(error => {
        setLoading(false);
        NotificationManager.error(t('error_report_generation - ' + error), '');
      })
    //setReportdata(reportdata);
    if (reportnum == 1) {
      setReport1(true);
      setReport2(false);
      setReport3(false);
      setReport4(false);
      setReport5(false)
    } else if (reportnum == 2) {
      setReport1(false);
      setReport2(true);
      setReport3(false);
      setReport4(false);
      setReport5(false);
    } else if (reportnum == 3) {
      setReport1(false);
      setReport2(false);
      setReport3(true);
      setReport4(false);
      setReport5(false);
    } else if (reportnum == 4) {
      setReport1(false);
      setReport2(false);
      setReport3(false);
      setReport4(true);
      setReport5(false);
    } else if (reportnum == 5) {
      setReport1(false);
      setReport2(false);
      setReport3(false);
      setReport4(false);
      setReport5(true);
    } else {
      setReport1(false);
      setReport2(false);
      setReport3(false);
      setReport4(false);
      setReport5(false);
    }
  }

  return (
    <Container component="main" style={{ background: '#efefef', minHeight: '100vh' }} >
      <NotificationContainer />
      <Box
        sx={{
          margin: 0,
          padding: 2,
          marginTop: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "auto",
          height: "auto",
          background: 'white',
          borderRadius: 2,
          boxShadow: 5
        }}
      >
        <form id="reportform" onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gridTemplateRows: 'auto',
              gridTemplateAreas: `"header header header header" "footer"`,
            }}>
            <FormControl style={{ marginRight: 5 }}>
              <InputLabel id="demo-simple-select-label">{t('report')}</InputLabel>
              <Select
                style={{ fontSize: 14, margin: 10 }}
                labelId="demo-simple-select-label"
                defaultValue={report.value_en}
                name='report'
                fullWidth
                id='report'
                {...register('report', { required: true })}
                value={report.value_en}
                onChange={handleReportChange}
              >
                {reportset.map(x => {
                  return <MenuItem value={x} style={{ fontSize: 12 }}>{x.value_en}</MenuItem>
                })}
              </Select>
            </FormControl>
            <FormControl style={{ marginRight: 5 }}>
              <InputLabel id="demo-simple-select-label">{t('Location')}</InputLabel>
              <Select
                style={{ fontSize: 14, margin: 10 }}
                labelId="demo-simple-select-label"
                defaultValue={location.value_en}
                name='location'
                fullWidth
                id='location'
                {...register('location', { required: true })}
                value={location.value_en}
                onChange={handleLocationChange}
              >
                {locationset.map(x => {
                  return <MenuItem value={x} style={{ fontSize: 12 }}>{x.value_en}</MenuItem>
                })}
              </Select>
            </FormControl>
            <FormControl>
              <TextField
                type="date"
                style={{ margin: 10, marginRight: 5, marginLeft: 15 }}
                fullWidth
                label={t('from')}
                id='start_date'
                name='start_date'
                InputLabelProps={{
                  shrink: true,
                }}
                {...register('start_date', { required: true })}
                value={child.start_date}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <TextField
                type="date"
                style={{ margin: 10, marginRight: 5, marginLeft: 25 }}
                fullWidth
                label={t('to')}
                id='end_date'
                name='end_date'
                InputLabelProps={{
                  shrink: true,
                }}
                {...register('end_date', { required: true })}
                value={child.end_date}
                onChange={handleInputChange}
              />
            </FormControl>
          </Box>
          <Box sx={{ gridArea: 'footer' }}>
            <FormControl>
              <Button variant="contained" color="primary" type="submit"  >
                <ArticleIcon style={{ marginRight: 10 }} />{t('generate_report')}
              </Button>
            </FormControl>
          </Box>
        </form>
      </Box>
      <Box
        sx={{
          margin: 0,
          marginTop: 5,
          padding: 2,
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "auto",
          minHeight: "90vh",
          background: 'white',
          borderRadius: 2,
          boxShadow: 5

        }}
      >
        {loading && <Spinner message={t('loading_report')} />}
        {!loading && report1 && < Report1 data={reportdata} />}
        {!loading && report2 && < Report2 data={reportdata} />}
        {!loading && report3 && < Report3 data={reportdata} />}
        {!loading && report4 && < Report4 data={reportdata} />}
        {!loading && report5 && < Report5 data={reportdata} />}
      </Box>
    </Container >
  );
};
