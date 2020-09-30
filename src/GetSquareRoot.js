import React, { useState} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Designed by © '}
      <Link color="inherit" href="https://www.linkedin.com/in/khalilurrehmann/">
        Khalil Ur Rehman
      </Link>
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function GetSquareRoot() {
  const classes = useStyles();

  const [loading,setLoading] = useState(false);
    const [val,setVal] = useState();
    const [value,setValue] = useState();
    const [result, setResult] = useState();
    const [required, setRequired] = useState();

    const onChangeHandler = e =>{
        setVal(Math.round(e.target.value));
    }

    const onClickHandler = async () =>{
      if(val){
        setLoading(true);
        const {data} = await axios.get('https://cors-anywhere.herokuapp.com/https://gxxph4h9l6.execute-api.us-east-1.amazonaws.com/default/front_end_hiring', {
            params:{
                input: val
            }
        });
        setLoading(false);
        setResult(data.result);
        setValue(val);
        setVal('');
        setRequired('');
      }
      else{
        setRequired('This field is required');
      }
    }

  return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Circadia Health , React Test
        </Typography>
        <form className={classes.form}>
          {
            loading?
            <div>
            <TextField
            type="number"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="number"
            label="Enter Number to find square root"
            name="number"
            autoComplete="number"
            autoFocus
            value={val}
            onChange={onChangeHandler}
            disabled
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onClickHandler}
            disabled
          >
            Calculate Square Root
          </Button>
            <div className={classes.root}>
             <CircularProgress  style={{margin: '0 auto'}} />
            </div> 
            </div>:
          
          <div>
          <TextField
          type="number"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="number"
            label="Enter Number to find square root"
            name="number"
            autoComplete="number"
            autoFocus
            required="required"
            onChange={onChangeHandler}
            value={val}
          />
          {
            required?
          <p class="textDanger">Please Enter a number *</p>:
          <p></p>
}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onClickHandler}
          >
            Calculate Square Root
          </Button>
            <div className={classes.root}>
              {
                result?
                <p>Square root of number {value} is : <span className="result">{result}</span></p>:
                <p></p>

              }
              
            </div>
            </div>
}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>  
  );
}