import React, { useEffect } from 'react'
import { Stack, Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

function SalesDisplayBox(props) {

  useEffect(() => {

  }, []);

  return (
    <Card
      sx={{ height: '100%' }}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Stack>
              <Typography
                color="primary"
                variant="h5"
              >
                Sales
              </Typography>
              <Typography
              >
                Today/All
              </Typography>
              <Typography
                color="textPrimary"
                variant="h3"
              >
                {props.day}/{props.all}
              </Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: '#22ff21',
                height: 56,
                width: 56
              }}
            >
              <EmojiPeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          
        </Box>
      </CardContent>
    </Card>
  );
}

export default SalesDisplayBox