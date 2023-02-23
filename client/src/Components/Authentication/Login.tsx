import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { url } from '../../Utilities/util';
import { postRequest } from '../../Utilities/Network';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      <Link color="inherit" href="https://qala.dev/">
        Qala
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const navigate:NavigateFunction = useNavigate()
  const {route} = useParams()
  const [alert,setAlert] = React.useState(false)
  const [message,setMessage] = React.useState({
    text:'',
    severity:'info'
  })
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(route === "register"){
      if(registerValidator(data) === false ){
        return
      }
      const payload = {
        email:data.get('email'),
        firstName:data.get('firstName'),
        middleName:data.get('middleName'),
        business:data.get('business'),
        password:data.get('password')
      } 
      const method:string = url + '/auth/signup';
      const response = await postRequest(method,payload);
      if(response.meta.status){
        setMessage({
          text:'Business created successfully',
          severity:'success'
        })
        setAlert(true)
        return;
      }else if (response.meta.status === false){
        setMessage({
          text:'Business with this email exist',
          severity:'error'
        })
        setAlert(true)
        return;
      }
      setMessage({
        text:'Something went wrong',
        severity:'error'
      })
      setAlert(true)
      return;
    }
    if (loginValidator(data) === false){
      return;
    }
    const payload = {
      email:data.get('email'),
      password:data.get('password')
    } 
    const method:string = url + '/auth/login';
    const response = await postRequest(method,payload);
    console.log(response)
    if(response.meta.status){
      localStorage.setItem("token",response.data.token)
      navigate('/dashboard')
      return;
    }else if (response.meta.status === false){
      setMessage({
        text:'Email or Password is incorrect',
        severity:'error'
      })
      setAlert(true)
      return;
    }
  };
  const registerValidator = (data:any)=>{
    if(!data.get('password') ||
       !data.get('confirmPassword') ||
        !data.get('firstName') ||
         !data.get('lastName') || 
         !data.get('email') ||
         !data.get('business')){
        setMessage({
          text:'All fields are required',
          severity:'error'
        })
        setAlert(true)
        return false;
      }
      if(data.get('password') !== data.get('confirmPassword')){
        setMessage({
          text:'Password and Confirm password do not match',
          severity:'error'
        })
        setAlert(true)
        return false;
      }
    return true
  }
  const loginValidator = (data:any)=>{
    if(!data.get('password') ||

         !data.get('email')){
        setMessage({
          text:'All fields are required',
          severity:'error'
        })
        setAlert(true)
        return false;
      }
    return true
  }
  const closeHandler = ()=>{
    if(message.text === "Business created successfully"){
      navigate('/auth/login')
    }
    setAlert(false)
    setMessage({
      text:'',
      severity:'info'
    })
  }
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://static1.srcdn.com/wordpress/wp-content/uploads/2022/11/Bitcoin-Lightning-Network-Featured.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5">
              Sat Pay
            </Typography>
            { 
              alert?
              <Alert onClose={closeHandler} >
                <AlertTitle>{message.text}</AlertTitle>
               
            </Alert>
            :null
            }
            {route ==="login"?
              <div>
                 <Typography variant="body1" >
              Get sats
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  background:'yellowAccent'
                }}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                <Link onClick={()=>{
                    navigate('/auth/register')
                  }}variant="body2">
                  {"Dont have have an account? Register"}
                </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
              </div>
            :
              <div>
                 <Typography variant="body1" >
             Register
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="firstName"
                label="First Name"
                type="text"
                id="name"
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="lastName"
                label="Last Name"
                type="text"
                id="lastName"
              />
               <TextField
                margin="normal"
                required
                fullWidth
                name="business"
                label="Business Name"
                type="text"
                id="business"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
               <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmassword"
              />
            
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Get In
              </Button>
              <Grid container>
                <Grid item>
            
                    <Link onClick={()=>{
                      console.log(">>>")
                      navigate('/auth/login')
                    }} variant="body2">
                    {"Have an account? Sign in"}
                  </Link>
                  
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
              </div>
          }
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}