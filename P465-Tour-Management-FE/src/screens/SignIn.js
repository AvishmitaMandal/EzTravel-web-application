import React, {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import GoogleIcon from '@mui/icons-material/Google';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import LoginNavComponent from '../util/LoginNavComponent';
import { useNavigate } from 'react-router-dom';

export function Copyright(props) {
  return (
    <div>
      <LoginNavComponent />
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          EzTravel
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </div>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    console.log(sessionId)

    if (sessionId) {
      fetch('http://owenhar1.asuscomm.com:3000/gettoken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          localStorage.token = data.token;  // Store the JWT token
          console.log(localStorage.token)
          navigate('/signin', { replace: true });
        } else {
          throw new Error('Token not found');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        navigate('/signin', { replace: true });
      });
    }
  }, [navigate]);

  const handleGoogleOAuthSubmit = async () => {
    window.location.href = 'http://owenhar1.asuscomm.com:3000/auth/google'
  };

  const handleOTPSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const otp = formJson.otp;
    const response = await fetch("http://owenhar1.asuscomm.com:3000/verifyotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({otpCode : otp, token: localStorage.tempToken})
    })
    const json = await response.json();
    if (json.error) {
      setError('Incorrect OTP entered');
    }
    if (json.message) {
      localStorage.token = json.token;
      setOpen(false)
      localStorage.status=""
      localStorage.tempToken=""
      window.location.href = "/";
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let login = {
      email: data.get('email'),
      password: data.get('password'),
    };
    const response = await fetch("http://owenhar1.asuscomm.com:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(login)
    })
    const json = await response.json();
    localStorage.tempToken = json.token
    if (json.error) {
      alert("Username/Password combo incorrect")
    }
    if (json.message) {
      const response = await fetch("http://owenhar1.asuscomm.com:3000/sendotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: localStorage.tempToken })
      })
      const res = await response.json();
      localStorage.status = res.status;
      setOpen(true);
    }
    // window.location.reload();
  };

  let user = {
    "username": "",
    "password": ""
  }
  const handleLogOut = () => {
    // event.preventDefault();
    localStorage.token = ""
    window.location.reload();
  }
  const verify = async (token) => {
    const response = await fetch("http://owenhar1.asuscomm.com:3000/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "token": token
      })
    });
    let json = await response.json();
    console.log(json)
    user = json;
  }
  if(localStorage.status) {
    return (
      <Dialog
        open={open}
        disableBackdropClick
        PaperProps={{
          component: 'form',
          onSubmit: handleOTPSubmit,
        }}
      >
        <DialogTitle>Verification Initiated</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide the One-Time Password (OTP) sent to you on your registered email in order to authenticate you into our system.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="otp"
            name="otp"
            label="OTP"
            fullWidth
            variant="standard"
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              maxLength: 6
            }}
          />
          {error && <Alert severity="error">{error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    );
  }
  if (localStorage.token) {
    verify(localStorage.token);
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            Logged in!
            <Button onClick={handleLogOut}
              type="logOut"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log Out!
            </Button>
            <Button onClick={() => {
              window.location.href = '/'
            }}
              type="home"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Home
            </Button>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    )
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#2484BF' }}>
            <LockOutlinedIcon style={{ color: 'white' }} /> {/* Change color here */}
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#2484BF' }}
              style={{ backgroundColor: '#2484BF' }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/ForgotPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <div style={{ margin: '20px 0' }}>
              <Divider>
                <Chip label="OR" size="small" />
              </Divider>
            </div>
            <Box style={{ "padding": '1em', "justify-content": "center", "display": "flex", "gap": "10px" }}>
              <Button onClick={handleGoogleOAuthSubmit} variant="outlined" startIcon={<GoogleIcon />}>
                Continue with google
              </Button>
            </Box>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}