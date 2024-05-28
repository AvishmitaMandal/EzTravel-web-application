import React, { useEffect, useState, image } from 'react'
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

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function CurrencyConverter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('')
    let [rates, setRates] = useState({});
    

    const handleChange = (event) => {
        setInput(event.target.value);
        console.log(input);
    };
    const handleChangeOut = (event) => {
        setOutput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        formJson.input = input;
        formJson.output = output;
        console.log(formJson);

        let outputValue = document.getElementById('outputCurrency');

        if (rates[input] && rates[input][output]) {
            console.log("Exists using prepopulated exchange")
            outputValue.innerText = Math.round(rates[input][output] * Number(formJson.inputCurrency) * 100) / 100

        } else {
            fetch(`http://owenhar1.asuscomm.com:3000/api/convertCurrency?base_currency=${input}&currencies=${output}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                let tempRate = rates;
                tempRate[input] = {};
                tempRate[input][output] = data.data[output].value;
                setRates(tempRate);
                outputValue.innerText = Math.round(data.data[output].value * Number(formJson.inputCurrency) * 100) / 100;
            })
        }


    }


    return (
        <>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <div class="row">
                    <InputLabel id="input-label">Input</InputLabel>
                    <Select
                        labelId="input"
                        id="input"
                        value={input}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={"USD"}>USD</MenuItem>
                        <MenuItem value={"EUR"}>EUR</MenuItem>
                        <MenuItem value={"GBP"}>GBP</MenuItem>
                    </Select>
                    <TextField
                        margin="normal"
                        required
                        name="inputCurrency"
                        label="Input Currency"
                        type="number"
                        id="inputCurrency"
                    />
                </div>
                <div class="row">
                    <InputLabel id="output-label">Output</InputLabel>
                    <Select
                        labelId="ouput-label"
                        id="output"
                        value={output}
                        label="Age"
                        onChange={handleChangeOut}
                    >
                        <MenuItem value={"USD"}>USD</MenuItem>
                        <MenuItem value={"EUR"}>EUR</MenuItem>
                        <MenuItem value={"GBP"}>GBP</MenuItem>
                    </Select>
                    <div id="outputCurrency">
                        Output Currency
                    </div>
                </div>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: '#2484BF' }}
                    style={{ backgroundColor: '#2484BF' }}
                >
                    Convert
                </Button>
            </Box>
        </>
    );

}