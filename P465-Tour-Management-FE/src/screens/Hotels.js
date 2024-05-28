import React, { useState, useEffect } from 'react';
import AppBarComponent from '../util/AppBarComponent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ReviewComponent from '../util/ReviewComponent';
import RateReviewIcon from '@mui/icons-material/RateReview';


// Mock hotel data
const mockHotels = [
  {
    hotelID: '1',
    name: 'DoubleTree by Hilton Chico',
    location: 'California',
    pictureURL: 'https://via.placeholder.com/150',
    price: 100,
    ratings: 4.5
  },
  {
    hotelID: '2',
    name: 'Marriott Chicago OHare',
    location: 'Chicago',
    pictureURL: 'https://via.placeholder.com/150',
    price: 150,
    ratings: 4.2
  },
  {
    hotelID: '3',
    name: 'Congress Plaza Hotel',
    location: 'Chicago',
    pictureURL: 'https://via.placeholder.com/150',
    price: 250,
    ratings: 4.2
  },
  {
    hotelID: '4',
    name: 'Hotel XYZ',
    location: 'City XYZ',
    pictureURL: 'https://via.placeholder.com/150',
    price: 50,
    ratings: 4.2
  }
];


const HotelTile = ({ hotel , onOpenReviewComponent}) => (
  <div style={{ display: 'flex', border: '1px solid #ccc', borderRadius: '5px', margin: '10px', padding: '10px' }}>
    <img src={hotel.pictureURL} alt={hotel.name} style={{ width: '150px', height: '150px', marginRight: '10px', borderRadius: '5px' }} />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6">{hotel.name}</Typography>
      <Typography>{hotel.location}</Typography>
      <Typography>Price: ${hotel.price} per night</Typography>
      <Typography>Ratings: {hotel.ratings}</Typography>
      <Button onClick={(e) => { e.stopPropagation(); onOpenReviewComponent(hotel); }} className="grid-review-btn">
          <RateReviewIcon style={{ color: 'gray' }} />
          Leave a review
      </Button>
      <Button variant="contained" color="primary" style={{ marginTop: 'auto' }}>
        Book
      </Button>
    </div>
  </div>
);

function Hotels() {
  const [location, setLocation] = useState('');
  const [activityDate, setActivityDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [displayedHotels, setDisplayedHotels] = useState([]);
  const [priceFilter, setPriceFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [reviewLocation, setReviewLocation] = useState(null);
  const openReviewComponent = (location) => {
    if (localStorage.token) {
      setReviewLocation(location);
    } else {
      alert("Please login to complete this action");
    }
  };
  const handleCloseReview = () => {
    setReviewLocation(null);
  };

  const handleSearch = () => {
    console.log("Search triggered");
  let filteredHotels = mockHotels;
  if (location.trim() !== '') {
    const searchQuery = location.toLowerCase().trim();

    filteredHotels = filteredHotels.filter(hotel =>
      hotel.name.toLowerCase().includes(searchQuery) ||
      hotel.location.toLowerCase().includes(searchQuery) ||
      hotel.name.toLowerCase().startsWith(searchQuery) ||
      hotel.location.toLowerCase().startsWith(searchQuery) ||
      hotel.name.toLowerCase() === searchQuery ||
      hotel.location.toLowerCase() === searchQuery
    );
  }
  setDisplayedHotels(filteredHotels);
  };

  useEffect(() => {
    // Set displayed hotels initially
    setDisplayedHotels(mockHotels);
  }, []);

  const filterByPrice = (min, max) => {
    const filteredHotels = mockHotels.filter(hotel => hotel.price >= min && hotel.price <= max);
    setDisplayedHotels(filteredHotels);
  };

  const filterByRating = rating => {
    const filteredHotels = mockHotels.filter(hotel => hotel.ratings >= rating);
    setDisplayedHotels(filteredHotels);
  };

  const resetFilters = () => {
    setLocation('');
    setActivityDate('');
    setGuests(1);
    setDisplayedHotels(mockHotels);
    setPriceFilter('');
    setRatingFilter('');
  };
  
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <AppBarComponent />
      <p></p>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center',paddingLeft: '20px'  }}>
          <TextField fullWidth label="Location" value={location} onChange={(e) => setLocation(e.target.value)} variant="outlined" style={{ maxWidth: '600px' }} />
          <TextField type="date" label="Date of activity" value={activityDate} onChange={(e) => setActivityDate(e.target.value)} InputLabelProps={{ shrink: true }} style={{ minWidth: '300px' }} />
          <TextField type="number" label="Guests" value={guests} onChange={(e) => setGuests(e.target.value)} inputProps={{ min: 1 }} variant="outlined" style={{ minWidth: '300px' }} />
          <Button variant="contained" color="primary" onClick={handleSearch} style={{ minWidth: '200px' }}>
            Search
          </Button>
        </div>
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1,flex: '0 0 200px', padding: '20px', borderRight: '1px solid #ccc',alignItems: 'center' }}>
        <Typography variant="h6" >Filters</Typography>
        <div>
        <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px', marginBottom: '10px' }}>
          <Typography variant="h6">Filter by Price:</Typography>
          <Button onClick={() => filterByPrice(0, 50)} style={{ margin: '5px',border: '1px solid #ccc', borderRadius: '5px' }}> $0 - $50 </Button>
          <Button onClick={() => filterByPrice(50, 100)} style={{ margin: '5px',border: '1px solid #ccc', borderRadius: '5px' }}> $50 - $100 </Button>
          <Button onClick={() => filterByPrice(100, 150)} style={{ margin: '5px',border: '1px solid #ccc', borderRadius: '5px' }}> $100 - $150 </Button>
          </div>
          <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px', marginBottom: '10px' }}>
          <Typography variant="h6">Filter by Rating:</Typography>
          <Button onClick={() => filterByRating(4)} style={{ margin: '5px',border: '1px solid #ccc', borderRadius: '5px' }}>4 and above</Button>
          <Button onClick={() => filterByRating(3)} style={{ margin: '5px',border: '1px solid #ccc', borderRadius: '5px' }}>3 and above</Button></div>
        </div>
        <Button variant="outlined" color="primary" onClick={resetFilters}>Reset Filters</Button>
      </div>
      <div style={{ flex: 2, padding: '20px' }}>
       
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h4">Hotels</Typography>
          <Grid container spacing={3}>
            {displayedHotels.length > 0 ? (
              displayedHotels.map(hotel => (
                <Grid item xs={12} sm={6} key={hotel.hotelID}>
                  <HotelTile hotel={hotel} onOpenReviewComponent={openReviewComponent}  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography>No hotels found</Typography>
              </Grid>
            )}
          </Grid>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Hotels;
