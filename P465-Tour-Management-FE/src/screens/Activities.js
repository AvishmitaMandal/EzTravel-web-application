import React, { useState } from 'react';
import AppBarComponent from '../util/AppBarComponent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import { Checkbox, ListItemText } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GuidedMuseumImage from '../images/Activities/guided-museum-tour.jpg';
import FamilyFunParkImage from '../images/Activities/family-fun-park-day.jpg';
import MountainBikingAdventureImage from '../images/Activities/mountain-biking-adventure.jpg';
import SunsetKayakingImage from '../images/Activities/sunset-kayaking.jpg';
import WhaleWatchingImage from '../images/Activities/whale-watching.jpg';

function Activities () {
  const [activityTypes, setActivityTypes] = useState([]);
  const [classType, setClassType] = useState('');
  const [guests, setGuests] = useState(1);
  const [activityDate, setActivityDate] = useState('');
  const [timeOfday, setTimeOfDay] = useState('');
  const [location, setLocation] = useState('');
  const [tripType, setTripType] = useState('');

  // Options that will be available in our dropdown menu
  const types = ["Art and culture", "Kid friendly", "Nature and outdoors", "Sports" ];

  // Handle change for the selected type or types
  const handleActivityTypeOptionChange = (event) => {
    const value = event.target.value;
    setActivityTypes(typeof value === 'string' ? value.split(',') : value);
  };

  const [activities, setActivities] = useState([
    // Sample activities data
    { id: 1, 
      name: 'Guided Museum Tour', 
      type: 'Art and culture', 
      maxGuests: 20,
      location: 'The Metropolitan Museum of Art, New York',
      startTime: '10:00 AM',
      duration: '2 hours', 
      price: 30,
      classType: 'moderate',
      date: '06/15/2024',
      rating: 4.8,
      isFavorited: false,
      image: GuidedMuseumImage,
    },
    { id: 2, 
      name: 'Family Fun Park Day', 
      type: 'Kid friendly', 
      maxGuests: 100,
      location: 'Disneyland, California',
      startTime: '09:00 AM',
      duration: '12 hours', 
      price: 150,
      classType: 'expensive',
      date: '08/07/2024',
      rating: 4.5,
      isFavorited: false,
      image: FamilyFunParkImage,
    },
    { id: 3, 
      name: 'Mountain Biking Adventure', 
      type: 'Sports', 
      maxGuests: 10,
      location: 'Moab, Utah',
      startTime: '08:00 AM',
      duration: '4 hours', 
      price: 60,
      classType: 'expensive',
      date: '07/05/2024',
      rating: 4.9,
      isFavorited: false,
      image: MountainBikingAdventureImage,
    },
    { id: 4, 
      name: 'Sunset Kayaking', 
      type: 'Nature and outdoors', 
      maxGuests: 15,
      location: 'Lake Tahoe, Nevada',
      startTime: '06:00 PM',
      duration: '2.5 hours', 
      price: 40,
      classType: 'moderate',
      date: '08/02/2024',
      rating: 4.7,
      isFavorited: false,
      image: SunsetKayakingImage,
    },
    { id: 5, 
      name: 'Whale Watching', 
      type: 'Nature and outdoors', 
      maxGuests: 25,
      location: 'Monterey Bay, California',
      startTime: '07:00 AM',
      duration: '5 hours', 
      price: 10,
      classType: 'cheap',
      date: '04/27/2024',
      rating: 4.9,
      isFavorited: false,
      image: WhaleWatchingImage,
    },
  ]);

  // Placeholder for search function
  const handleSearch = () => {
    // Filter activities based on search criteria entered by the user
    const filteredActivities = activities.filter(activity => {
      const matchesLocation = location ? activity.location.toLowerCase().includes(location.toLowerCase()) : true;
      const matchesTypes = activityTypes.length ? activityTypes.includes(activity.type) : true;
      const matchesClassType = classType ? activity.classType === classType : true;
      const matchesActivityDate = activityDate ? activity.date === activityDate : true;
      const matchesTimeOfDay = timeOfday ? 
        (timeOfday === 'morning' && activity.startTime <= '12:00 PM') ||
        (timeOfday === 'afternoon' && activity.startTime > '12:00 PM' && activity.startTime <= '05:00 PM') ||
        (timeOfday === 'evening' && activity.startTime > '05:00 PM') : true;

      return matchesLocation && matchesTypes && matchesClassType && matchesActivityDate && matchesTimeOfDay;
    });
  
    setActivities(filteredActivities);
  };

  const toggleFavorite = (index) => {
    // Toggle the favorite status of a activity
    const newActivities = activities.map((activity, idx) =>
      idx === index ? { ...activity, isFavorited: !activity.isFavorited } : activity
    );
    setActivities(newActivities);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <AppBarComponent />
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '64px', padding: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', margin: '0 auto' }}>
          <FormControl variant="outlined" style={{ minWidth: '200px' }}>
            <InputLabel id="activity-types-options">Type of activities</InputLabel>
            <Select labelId="activity-types-options" id="activity-types-select" multiple value={activityTypes} onChange={handleActivityTypeOptionChange} renderValue={(selected) => selected.join(', ')}>
              {types.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={activityTypes.indexOf(option) > -1} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" style={{ minWidth: '200px' }}>
            <InputLabel>Price of activity</InputLabel>
            <Select value={classType} onChange={(e) => setClassType(e.target.value)} label="Price of activity">
              <MenuItem value="free">Free</MenuItem>
              <MenuItem value="cheap">Cheap ($1 - $10)</MenuItem>
              <MenuItem value="moderate">Moderate ($10 - $50)</MenuItem>
              <MenuItem value="expensive">Expensive (greater than $50)</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" style={{ minWidth: '200px' }}>
            <InputLabel>Time of day</InputLabel>
            <Select value={timeOfday} onChange={(e) => setTimeOfDay(e.target.value)} label="Time of day">
              <MenuItem value="morning">Morning (Start before 12pm)</MenuItem>
              <MenuItem value="afternoon">Afternoon (Start after 12pm)</MenuItem>
              <MenuItem value="evening">Evening (Start after 5pm)</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{ display: 'flex', gap: '10px', rowGap: '50px', margin: '0 auto' }}>
          <TextField fullWidth label="Location" value={location} onChange={(e) => setLocation(e.target.value)} variant="outlined" style={{ marginLeft: '10px', maxWidth: '500px' }} />
          <TextField
            type="date"
            label="Date of activity"
            value={activityDate}
            onChange={(e) => setActivityDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            style={{ width: '25%', minWidth: '400px', height: '20px' }}
          />
          <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginTop: '20px', maxWidth: '150px', minHeight: '20px' }}>
            Search
          </Button>
        </div>
      </div>
      <h2>{location ? `${location} - ${tripType.charAt(0).toUpperCase() + tripType.slice(1)}` : 'All Activities'}</h2>
      <p>{activities.length} activities</p>
      {activities.length > 0 && (
        <div className="grid-container">
          {activities.map((activity, index) => (
            <div key={index} className="grid-item">
              <img src={activity.image} alt="Activity" style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
              <div className="grid-text">
                <h3>{activity.name}</h3>
                <p>Activity Type: {activity.type}</p>
                <p>Location: {activity.location}</p>
                <p>Start Time: {activity.startTime} Duration: {activity.duration}</p>
                <button onClick={() => toggleFavorite(index)} className="grid-favorite-btn">
                  {activity.isFavorited ? <FavoriteIcon style={{ color: '#F25C5C' }} /> : <FavoriteBorderIcon style={{ color: 'black' }} />}
                </button>
                <button onClick={() => console.log('Added to itinerary', activity.id)} className="grid-add-btn">
                  + Add
                </button>
                <p>Class: {activity.classType}</p>
                <h3>Price: ${activity.price}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Activities;