import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import './propage.css';

function Copyright() {
  return (
    <Typography variant="body2" color="white" align="center" marginTop="20px">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        sheHelp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function Profile() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="page">
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{fontFamily:'Anton',fontWeight:'bold',fontSize:'50px'}}>
          Update Profile
        </Typography>
        <div className="containers">
          <form className={classes.form} style={{backgroundColor: 'rgb(255, 255, 255,0.75)',padding:'25px',marginTop:'0px'}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={10}>
                <TextField
                  required
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="phno"
                  label="Phone Number"
                />
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  autoComplete="location"
                  name="loc"
                  variant="outlined"
                  required
                  fullWidth
                  id="floc"
                  label="City"
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    disableToolbar
                    fullWidth
                    variant="inline"
                    format="dd/MM/yyyy"
                    id="date-picker-inline"
                    label="DOB: DD/MM/YYYY"
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              >
              Submit
            </Button>
          </form>
        </div>        
      </div>
      <Box mt={5} style={{color:'white'}}>
        <Copyright />
      </Box>
    </Container>
    </div>
  );
}
