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
import SignInWithGoogleLogo from '../images/SIgnInWithGoogle.png'
import { Copyright } from './SignIn'
import { Code } from '@mui/icons-material';

const defaultTheme = createTheme();

export default function ForgotPassword() {

    const [resetState, setResetState] = React.useState(null);
    const [userInfo, setUserInfo] = React.useState(null);
    const handleEmailSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const info = {
            "email": data.get('email')
        }

        const response = await fetch("http://owenhar1.asuscomm.com:3000/api/forgotpassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        })
        const json = await response.json()
        console.log(json)

        if(!json.error && json.success) {
            console.log("email submitted", info)
            setResetState("code")
            setUserInfo(info)
        } else {
            alert("Email not found")
        }

        
    };
    const handleCodeSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const info = userInfo;
        info.otp = Number(data.get('code'));
        console.log("code gotten", info)
        setUserInfo(info);
        setResetState("password")
    };
    const handlePasswordSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const info = userInfo;
        info.newPassword = data.get('password');
        console.log(info)
        // email, otp, newPassword
        const response = await fetch("http://owenhar1.asuscomm.com:3000/api/resetpassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        })
        const json = await response.json()
        console.log(json)
        if(json.error) {
            alert("Error: OTP code incorrect/New password cannot be the same as the old password")
            setResetState("code")
        } else {
            setResetState("done")
        }
        
    };
    const EmailForm = () => {
        return (
            <Box component="form" noValidate onSubmit={handleEmailSubmit} sx={{ mt: 3 }}>
                <TextField
                    autoComplete="email"
                    name="email"
                    required
                    fullWidth
                    id="email"
                    label="Account Email"
                    autoFocus
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Send-Email
                </Button>
            </Box>
        )
    }

    const CodeScreen = () => {
        return (
            <Box component="form" noValidate onSubmit={handleCodeSubmit} sx={{ mt: 3 }}>
                <Typography>
                    Please the code sent to your email:
                </Typography>
                <TextField
                    autoComplete=""
                    name="code"
                    required
                    fullWidth
                    id="code"
                    label="Code"
                    autoFocus
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Verify Code
                </Button>
            </Box>
        )
    }

    const NewPassword = () => {
        return (
            <Box component="form" noValidate onSubmit={handlePasswordSubmit} sx={{ mt: 3 }}>
                <Typography>
                    Please enter your new password:
                </Typography>
                <TextField
                    autoComplete="password"
                    name="password"
                    required
                    fullWidth
                    id="password"
                    label="New Password"
                    autoFocus
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Verify Code
                </Button>
            </Box>
        )
    }

    const Done = () => {
        return (
            <Box sx={{ mt: 3 }}>
                <Typography>
                    Password Sucessfully Reset
                </Typography>
                <Button href="/SignIn" fullWidth variant="contained">
                    Login
                </Button>
            </Box>
        )
    }

    let toRender = <EmailForm></EmailForm>;

    if (resetState === "code") toRender = <CodeScreen></CodeScreen>
    else if (resetState === "password") toRender = <NewPassword></NewPassword>
    else if (resetState === "done") toRender = <Done></Done>

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <Box style={{ display: "flex", alignitems: "center", "flexFlow": "column nowrap", "justifyContent": "center", "marginTop": "4em" }}>
                    <Typography component="h1" variant="h4" style={{ "textAlign": "center" }}>
                        Forgot Password
                    </Typography>
                    {toRender}
                    <Copyright sx={{ mt: 5 }} />
                </Box>
            </Container>
        </ThemeProvider>
    );

}

