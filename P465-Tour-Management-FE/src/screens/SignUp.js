import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import LoginNavComponent from '../util/LoginNavComponent';

function Copyright(props) {
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

export default function SignUp() {

  const handleGoogleOAuthSubmit = async () => {
    window.location.href = 'http://owenhar1.asuscomm.com:3000/auth/google'
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const create = ({
      email: data.get('email'),
      password: data.get('password'),
      username: data.get('username'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      phoneNum: data.get('phoneNum')
    });
    const response = await fetch("http://owenhar1.asuscomm.com:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(create)
    })
    const json = await response.json();
    console.log(json);
    if (json.message) {
      localStorage.token = json.token;
    }
    window.location.replace('/SignIn')

  };

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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="UserName"
                  name="username"
                  autoComplete="Login username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNum"
                  label="Phone Number"
                  name="phoneNum"
                  autoComplete="Login username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: '#2484BF' }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/SignIn" variant="body2" style={{ color: '#2484BF' }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <div style={{ margin: '20px 0' }}>
              <Divider>
                <Chip label="OR" size="small" />
              </Divider>
            </div>
            <Box style={{ "padding": '1em', "justify-content": "center", "display": "flex", "gap": "10px" }}>
              {/* <SignInButton image={SignInWithGoogleLogo} link="https://google.com"></SignInButton> */}
              <Button onClick={handleGoogleOAuthSubmit} variant="outlined" startIcon={<GoogleIcon />}>
                Sign Up with google
              </Button>
            </Box>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}