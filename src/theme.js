import { createTheme } from '@mui/material/styles';
import { blue, green, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[900],
    },
    secondary: {
      main: purple[500],
    },
  },
  typography: {
    fontFamily: [
      'San Francisco',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h5: {
      color: purple[900],
    },
    h6: {
      fontSize: 14,
      margin: 5
    },
    body: {
      fontSize: 12,
      margin: 5
    }
  },
  components: {
    MuiInputLabel: {
      defaultProps: {
        sx: {
          fontSize: "14px",
        },
      },
    },
    MuiPaper: {
      minWidth: '800px',
      padding: '20px'
    },
    MuiGrid: {
      padding: 20
    },
    MuiFormControl: {
      MuiSelect: {
        minWidth: '500px'
      }
    }
  }
});

export default theme;