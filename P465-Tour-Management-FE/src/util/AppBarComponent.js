import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import EZTravelLogo from '../images/EZTravelLogo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CurrencyConverter from './CurrencyConverter';


function AppBarComponent() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const pages = ['Hotels', 'Flights', 'Activities', 'Itinerary', 'Convert'];
  const settings = ['Account', 'My Itinerary', 'Logout'];
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    if (localStorage.token && !user) {
      fetch("http://owenhar1.asuscomm.com:3000/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "token": localStorage.token
        })
      }).then((res) => res.json()).then((data) => {
        console.log(data)
        if (data.status == "error") {
          setUser(null)
          localStorage.token = ""
        } else {
          setUser(data)
          console.log(data)
        }
      })

    } else {
      setUser(null);
    }
  }, [])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event) => {
    if (event.setting == "Logout") {
      localStorage.token = "";
      setUser(null);
    }
    console.log(event)
    setAnchorElUser(null);
  };

  // Color codes: #F22E62 #2484BF #A2F2F2 #F2845C #F25C5C
  return (
    <AppBar position="static" style={{ backgroundColor: '#2484BF' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box component="img" src={EZTravelLogo} alt="EZTravel Logo" sx={{ display: { xs: 'none', md: 'flex' }, height: 40, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
              <React.Fragment key={page}>
                {page.toLowerCase() === 'itinerary' ? (
                  <Link to="/itinerary" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  </Link>
                ) : (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                )}
              </React.Fragment>
            ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            EZTravel
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  backgroundColor: location.pathname === `/${page}` ? '#65A8D2' : 'transparent', // Use a lighter color for the active tab
                  '&:hover': {
                    backgroundColor: location.pathname === `/${page}` ? '#65A8D2' : '', // Change hover color accordingly
                  },
                }}
              >
                <Link to={`/${page}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {page}
                </Link>
              </Button>
            ))}
          </Box>
          {/* This is dynamic - if the user is not logged it it will show, if they are then their account icon will come up */}
          {!user ? (
            <Box>
              <Button color="inherit" component={Link} to="/signin">
                SIGN IN
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                SIGN UP
              </Button>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0, flexFlow: "row nowrap", display: "flex", "align-items": "center", gap: "5px" }}>
              <Typography>
                {user.email}
              </Typography>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={(e) => handleCloseUserMenu({ setting })}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppBarComponent;