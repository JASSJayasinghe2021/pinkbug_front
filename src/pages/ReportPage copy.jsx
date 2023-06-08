import React, { useEffect, useState, useContext } from 'react'
import { Box, Container, FormControl, Select, Button, InputLabel, TextField, Grid, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { WidthFullRounded } from '@mui/icons-material';
import { Store } from '../utils/Store';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { apidata, report_level_data, report_type_data, locationset, category_data, location_data } from '../data/data';
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Spinner from '../components/items/Spinner';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfFonts from "pdfmake/build/vfs_fonts";
import html2canvas from "html2canvas";
import PdfViewer from '../components/items/PdfViewer';

export const ReportPage = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const [categoryies, setCategoryies] = useState(state.categories);
  const navigate = useNavigate();
  const { id, token, user_district, user_roles, location } = state.userInfo;
  const [category, setCategory] = useState('');
  const [categoryset, setCategoryset] = useState(report_type_data);
  const [catset, setCatset] = useState(category_data);
  const [place, setPlace] = useState('');
  const [placeset, setPlaceset] = useState(report_level_data);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [filepath, setFilepath] = useState();
  const [child, setChild] = useState({
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    const val = JSON.parse(atob(token.split('.')[1]));
    const nowval = Date.now();
    console.log(val.exp * 1000 + ' - ' + nowval)
    if (val.exp * 1000 < nowval) {
      NotificationManager.error(t('Token is expired, Please Login again'), '');
      dispatch({ type: 'USER_LOGOUT' });
      Cookies.remove('ec_edr_userinfo');
      navigate("/login", { replace: true });
    }
  }, [])


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setChild((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCategoryChange = (event) => {
    const { name, value } = event.target;
    setCategory(value);
  }

  const handleLocationChange = (event) => {
    const { name, value } = event.target;
    setPlace(value);
  }

  const formSchema = yup.object({
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(formSchema)
  });

  const createPdf = () => {
    /** 
   const doc = new jsPDF();
   //get table html
   const pdfTable = document.getElementById('printArea');
   //html to pdf format
   var html = htmlToPdfmake(pdfTable.innerHTML);
   const documentDefinition = { content: html };
   pdfMake.vfs = pdfFonts.pdfMake.vfs;
   pdfMake.createPdf(documentDefinition).open();
  */
    /** 
       html2canvas(document.getElementById("printArea")).then(canvas => {
         var data = canvas.toDataURL();
         var pdfExportSetting = {
           content: [
             {
               image: data,
               width: 500
             }
           ]
         };
         pdfMake.createPdf(pdfExportSetting).open();
       });
   */

  }

  const onSubmit = async (data) => {
    setLoading(true);
    const lng = localStorage.getItem('i18nextLng');
    //await axios.post(apidata.api + 'report/daystream', {
    await axios.post(apidata.api + 'report/day', {
      place: place.loc_id,
      category: category.id,
      start_date: data.start_date,
      end_date: data.end_date,
      lang: lng,
      user_id: id,
      location: location,
      user_role: user_roles[0].id
    }, { headers: { "Authorization": `Bearer ${token}` } })
      .then(data => {

        //const file = new Blob(
        //  [data.data],
        //  { type: 'application/pdf' });
        //console.log(file);
        //const fileURL = URL.createObjectURL(file);
        //console.log(fileURL);
        //setFilepath(fileURL);
        //Open the URL on new Window
        //window.open(fileURL);

        //setLoading(false);
        setResult(data.data);
        setLoading(false);
        console.log(data);
      })
      .catch(error => {
        setLoading(false);
        NotificationManager.error(t('error_data_save - ' + error), '');
      })
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
                defaultValue={category.value_en}
                name='category'
                fullWidth
                id='category'
                {...register('category', { required: true })}
                value={category.value_en}
                onChange={handleCategoryChange}
              >
                {categoryset.map(x => {
                  return <MenuItem value={x} style={{ fontSize: 12 }}>{x.value_en}</MenuItem>
                })}
              </Select>
            </FormControl>
            <FormControl style={{ marginRight: 5 }}>
              <InputLabel id="demo-simple-select-label">{t('Location')}</InputLabel>
              <Select
                style={{ fontSize: 14, margin: 10 }}
                labelId="demo-simple-select-label"
                defaultValue={category.value_en}
                name='category'
                fullWidth
                id='category'
                {...register('category', { required: true })}
                value={category.value_en}
                onChange={handleCategoryChange}
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
        {(!loading && result && category.id == 1) &&
          <>
            <h3 style={{ margin: 0, marginTop: 60, padding: 0 }}>
              <center>Local Bodies Election 2023</center>
            </h3>
            <h4 style={{ margin: 0, padding: 0 }}>
              <center>Daily Election Related Complains Summery Report</center>
            </h4>
            <h4 style={{ margin: 0, padding: 0 }}>
              <center>Election Commission of Sri Lanka</center>
            </h4>
            <p style={{ margin: 0, marginBottom: 20, padding: 0, fontSize: 12 }}>
              <center>Duration: From {child.start_date} 16:00:00 To {child.end_date} 15:59:59</center>
            </p>
            <table border={1} cellspacing="0" padding='3'>
              <thead>
                <tr>
                  <th width="70%">EDR Center</th>
                  <th>Complain Count</th>
                </tr>
              </thead>
              <tbody>

                {
                  result && result.items.map(x => {
                    return <tr>
                      {x.name_en && <td>{x.name_en}</td>}
                      {x.org_type && <td>{x.org_type == 'PD' ? 'SL Police' : 'District EDR'}</td>}
                      <td align='right'>{x.items}</td>
                    </tr>
                  })
                }
                {
                  location_data.map(y => {
                    let locState = true;
                    result && result.items.map(x => {
                      if(x.id){
                        if (y.id == x.id) {
                          locState = false; 
                        }
                      }else{
                        locState=false
                      } 
                    })
                    if (locState) {
                      return <tr>
                        <td>{y.value_en}</td>
                        <td align='right'>0</td>
                      </tr>
                    }
                  })
                }
                <tr>
                  <td><h4>Total Complains</h4></td>
                  <td align='right'><h4>{result ? result.itemcount : ''}</h4></td>
                </tr>
              </tbody>
            </table>
          </>
        }
        {(!loading && result && category.id == 2) &&
          <>
            <h3 style={{ margin: 0, marginTop: 60, padding: 0 }}>
              <center>Local Bodies Election 2023</center>
            </h3>
            <h4 style={{ margin: 0, padding: 0 }}>
              <center>Daily Category Via Election Related Complains Report</center>
            </h4>
            <h4 style={{ margin: 0, padding: 0 }}>
              <center>Election Commission of Sri Lanka</center>
            </h4>
            <p style={{ margin: 0, marginBottom: 20, padding: 0, fontSize: 12 }}>
              <center>Duration: From {child.start_date} 16:00:00 To {child.end_date} 15:59:59</center>
            </p>
            <table border={1} cellspacing="0" padding='3'>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Complain Count</th>
                </tr>
              </thead>
              <tbody>
                {
                  result && result.items.map(x => {
                    return <tr>
                      <td>
                        {categoryies.filter(cat => cat.id == x.category).map(filteredcat => (
                          filteredcat.value_en
                        ))}</td>
                      <td align='right'>{x.items}</td>
                    </tr>
                  })
                }
                {
                  result && categoryies.map(x => {
                    let state = false;
                    result.items.filter(cat => cat.category != x.id).map(filteredcat => (
                      state = true
                    ))
                    if (state) {
                      return <tr>
                        <td>
                          {x.value_en}
                        </td>
                        <td align='right'>0</td>
                      </tr>
                    }

                  })
                }
                <tr>
                  <td ><h4>Total Complains</h4></td>
                  <td align='right'><h4>{result ? result.itemcount : ''}</h4></td>
                </tr>
              </tbody>
            </table>
          </>
        }


      </Box>
    </Container >
  );
};
