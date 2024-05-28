import React, { useEffect, useState, image } from 'react'
import AppBarComponent from '../util/AppBarComponent'
import CurrencyConverter from '../util/CurrencyConverter'
import Container from '@mui/material/Container';

export default function Convert() {
    return (
        <div>
            <AppBarComponent />
            <Container component="main" maxWidth="sm">
            <h2>CurrencyConverter</h2>
            <CurrencyConverter></CurrencyConverter>
            </Container>
            
        </div>
    )
}