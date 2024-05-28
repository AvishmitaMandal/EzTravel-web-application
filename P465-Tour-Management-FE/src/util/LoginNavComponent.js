import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'; // You may keep this if you want other contents within to be aligned
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import EZTravelLogo from '../images/EZTravelLogo.png';

function LoginNavComponent() {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" style={{ backgroundColor: '#2484BF', width: '100%',}}>
      <Toolbar disableGutters sx={{ paddingLeft: '20px' }}>
        <Box component="img" src={EZTravelLogo} alt="EZTravel Logo" sx={{ display: { xs: 'none', md: 'flex' }, height: 40, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/" // Change this href to your home page link
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          EZTravel
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" sx={{ mr: 2 }} onClick={() => navigate('/')}>Return to Home</Button>
      </Toolbar>
    </AppBar>
  );
}

export default LoginNavComponent;
