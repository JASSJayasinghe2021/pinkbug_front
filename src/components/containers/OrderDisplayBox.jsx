import React from 'react';
import { Stack, Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

function OrderDisplayBox(props) {
  return (
    <Card
      sx={{  height: '100%', marginLeft: 5 }}
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
                Orders
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
      </CardContent>
    </Card>
  )
}

export default OrderDisplayBox
