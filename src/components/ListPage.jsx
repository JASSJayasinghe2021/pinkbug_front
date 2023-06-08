import React, { useState } from 'react'
import { Box, Container, FormControl, RadioGroup, FormControlLabel, Radio, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

export const ListPage = ({ title, complain, inquary }) => {
  const { t } = useTranslation();
  const [entrytype, setEntrytype] = useState('Complain');
  const [role, setRole] = useState(1);

  return (
    <Container component="main" style={{background:'#efefef', minHeight:'100vh'}} >
      <Box
        sx={{
          marginTop: 3,
          marginBottom: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <FormControl component='fieldset' style={{ background: 'transparent' }}>
          <RadioGroup
            row
            name='entrytype'
            value={entrytype}
            onChange={(e) => { setEntrytype(e.target.value) }}>
            <FormControlLabel
              label={t('complain')}
              value='Complain'
              control={<Radio />}
            >
            </FormControlLabel>
            {role == 9 || role == 12 ? '' : <FormControlLabel
              label={t('request')}
              value='Approval'
              control={<Radio />}
            >
            </FormControlLabel>}
          </RadioGroup>
        </FormControl>
     </Box>
        {entrytype === 'Complain' ? complain : inquary}
    </Container >
  );
};
