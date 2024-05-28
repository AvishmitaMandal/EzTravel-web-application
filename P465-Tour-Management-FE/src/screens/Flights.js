import React, { useState } from 'react';
import AppBarComponent from '../util/AppBarComponent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AmericanLogo from '../images/Airline-Logos/american-logo.jpg';
import DeltaLogo from '../images/Airline-Logos/delta-logo.png';
import SouthwestLogo from '../images/Airline-Logos/southwest-logo.jpg';
import SpiritLogo from '../images/Airline-Logos/spirit-logo.jpg';
import UnitedLogo from '../images/Airline-Logos/united-logo.jpg';

function Flights () {
  const [tripType, setTripType] = useState('');
  const [classType, setClassType] = useState('');
  const [guests, setGuests] = useState(1);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [flights, setFlights] = useState([
    // Sample flights data
    { id: 1, 
      airline: 'Spirit Airlines', 
      flightNumber: 'NK143', 
      departureTime: '09:00 AM', 
      arrivalTime: '11:00 AM', 
      duration: '2h', 
      price: 200,
      classType: 'Economy',
      from: 'Los Angeles, California',
      to: 'Las Vegas, Nevada',
      date: '07/14/2024',
      guests: 3,
      stops: 0,
      isFavorited: false,
      image: SpiritLogo,
    },
    { id: 2, 
      airline: 'Delta Airlines', 
      flightNumber: 'DL381', 
      departureTime: '02:30 PM', 
      arrivalTime: '11:30 PM', 
      duration: '9h', 
      price: 1200,
      classType: 'business',
      from: 'New York, New York',
      to: 'Dallas, Texas',
      date: '05/11/2024',
      guests: 1,
      stops: 1,
      isFavorited: false,
      image: DeltaLogo,
    },
    { id: 3, 
      airline: 'American Airlines', 
      flightNumber: 'AA100', 
      departureTime: '10:00 AM', 
      arrivalTime: '01:00 PM', 
      duration: '3h', 
      price: 500,
      classType: 'first-class',
      from: 'Destin, Florida',
      to: 'Miami, Florida',
      date: '10/10/2024',
      guests: 5,
      stops: 0,
      isFavorited: false,
      image: AmericanLogo,
    },
    { id: 4, 
      airline: 'United Airlines', 
      flightNumber: 'UA407', 
      departureTime: '04:00 AM', 
      arrivalTime: '09:00 PM', 
      duration: '17h', 
      price: 450,
      classType: 'economy',
      from: 'Indianapolis, Indiana',
      to: 'Austin, Texas',
      date: '08/20/2024',
      guests: 2,
      stops: 2,
      isFavorited: false,
      image: UnitedLogo,
    },
    { id: 5, 
      airline: 'Southwest Airlines', 
      flightNumber: 'SW456', 
      departureTime: '07:00 PM', 
      arrivalTime: '09:00 PM', 
      duration: '2h', 
      price: 150,
      classType: 'economy',
      from: 'Orlando, Florida',
      to: 'Atlanta, Georgia',
      date: '06/27/2024',
      guests: 1,
      stops: 0,
      isFavorited: false,
      image: SouthwestLogo,
    },
  ]);

  // Placeholder for search function
  const handleSearch = () => {
    // Filter flights based on search criteria including the guest count
    const filteredFlights = flights.filter(flight => {
      // Check if each field has been filled by the user before filtering
      const matchesFrom = from ? flight.from.includes(from) : true;
      const matchesTo = to ? flight.to.includes(to) : true;
      const matchesClassType = classType ? flight.classType === classType : true;
      const matchesGuests = flight.guests >= guests; // guests should always be checked
      const matchesStartDate = startDate ? flight.date === startDate : true;
      // Add condition for endDate if needed
      
      return matchesFrom && matchesTo && matchesClassType && matchesGuests && matchesStartDate;
    });
  
    setFlights(filteredFlights);
  };
  

  const toggleFavorite = (index) => {
    // Toggle the favorite status of a flight
    const newFlights = flights.map((flight, idx) =>
      idx === index ? { ...flight, isFavorited: !flight.isFavorited } : flight
    );
    setFlights(newFlights);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <AppBarComponent />
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '64px', padding: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', margin: '0 auto' }}>
          <Button variant={tripType === 'Round-trip' ? 'contained' : 'outlined'} onClick={() => setTripType('Round-trip')}>
            Round-trip
          </Button>
          <Button variant={tripType === 'One-way' ? 'contained' : 'outlined'} onClick={() => setTripType('One-way')}>
            One-way
          </Button>
          <FormControl variant="outlined" style={{ minWidth: '120px' }}>
            <InputLabel>Class</InputLabel>
            <Select value={classType} onChange={(e) => setClassType(e.target.value)} label="Class">
              <MenuItem value="economy">Economy</MenuItem>
              <MenuItem value="premium-economy">Premium Economy</MenuItem>
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="first-class">First Class</MenuItem>
              <MenuItem value="multiple">Multiple</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="number"
            label="Guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            inputProps={{ min: 1 }}
            variant="outlined"
            style={{ width: '150px' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '64px', marginTop: '20px' }}>
          <TextField fullWidth label="Flying from" value={from} onChange={(e) => setFrom(e.target.value)} variant="outlined" style={{ marginLeft: '10px', flex: 1 }} />
          <TextField fullWidth label="Flying to" value={to} onChange={(e) => setTo(e.target.value)} variant="outlined" style={{ marginLeft: '10px', flex: 1 }} />
          <TextField
            type="date"
            label="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            style={{ width: '25%' }}
          />
          {tripType === 'Round-trip' && (
            <TextField
              type="date"
              label="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              style={{ width: '25%' }}
            />
          )}
        </div>
        <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginTop: '20px' }}>
          Search
        </Button>
      </div>
      <h2>{to ? `${to} - ${tripType.charAt(0).toUpperCase() + tripType.slice(1)}` : 'All Flights'}</h2>
      <p>{flights.length} flights · {tripType} · {guests} Guests</p>
      {flights.length > 0 && (
        <div className="grid-container">
          {flights.map((flight, index) => (
            <div key={index} className="grid-item">
              <img src={flight.image} alt="Airline" style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
              <div className="grid-text">
                <h3>{flight.airline} {flight.flightNumber}</h3>
                <p>From: {flight.from} Departure Time: {flight.departureTime}</p>
                <p>To: {flight.to} Arrival Time: {flight.arrivalTime}</p>
                <p>Duration: {flight.duration} Stops: {flight.stops}</p>
                <p>Class: {flight.classType}</p>
                <button onClick={() => toggleFavorite(index)} className="grid-favorite-btn">
                  {flight.isFavorited ? <FavoriteIcon style={{ color: '#F25C5C' }} /> : <FavoriteBorderIcon style={{ color: 'black' }} />}
                </button>
                <button onClick={() => console.log('Added to itinerary', flight.id)} className="grid-add-btn">
                  + Add
                </button>
                <h3>Price: ${flight.price}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Flights;