import React, { useEffect, useState } from 'react';
import AppBarComponent from '../util/AppBarComponent';
import EZTravelLogo from '../images/EZTravelLogo.png';
import SearchComponent from '../util/SearchComponent';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TileComponent from '../util/TileComponent';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import ReviewComponent from '../util/ReviewComponent';

const HomeScreen = () => {
  const [locations, setLocations] = useState([
    { name: 'Sample Location 1', price: 150, rating: '★★★★☆', description: 'This is a sample description for Location 1.', image: EZTravelLogo, isFavorited: false },
    { name: 'Sample Location 2', price: 250, rating: '★★★☆☆', description: 'This is a sample description for Location 2.', image: EZTravelLogo, isFavorited: false },
    { name: 'Sample Location 3', price: 350, rating: '★★★★★', description: 'This is a sample description for Location 3.', image: EZTravelLogo, isFavorited: false },
  ]);
  const [recommendedLocations, setRecommendedLocations] = useState([
    { name: 'Sample Location 1', price: 150, rating: '★★★★☆', description: 'This is a sample description for Location 1.', image: EZTravelLogo, isFavorited: false },
    { name: 'Sample Location 2', price: 250, rating: '★★★☆☆', description: 'This is a sample description for Location 2.', image: EZTravelLogo, isFavorited: false },
    { name: 'Sample Location 3', price: 350, rating: '★★★★★', description: 'This is a sample description for Location 3.', image: EZTravelLogo, isFavorited: false },
  ]);


  const [selectedLocation, setSelectedLocation] = useState(null);
  const [place, setPlace] = useState(null)
  const [itineraries, setIt] = useState(null)
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


  useEffect(() => {
    fetch('http://owenhar1.asuscomm.com:3001/place/home')
      .then(response => response.json())
      .then(data => setLocations(data.randomPlaces))
      .catch(error => console.log('Error fetching locations:', error));
  }, []);

  const handleClose = () => {
    setSelectedLocation(null);
  };

  useEffect(() => {
    fetch('http://owenhar1.asuscomm.com:3001/place/recomend')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setRecommendedLocations(data)})
      .catch(error => console.error('Error fetching recommended locations:', error));
  }, []);

  const toggleFavorite = (locationName) => {
    setLocations(locations.map(location =>
      location.name === locationName ? { ...location, isFavorited: !location.isFavorited } : location
    ));

    // If a location is selected and its favorite status changes, update the selectedLocation as well
    if (selectedLocation && selectedLocation.name === locationName) {
      setSelectedLocation({
        ...selectedLocation,
        isFavorited: !selectedLocation.isFavorited
      });
    }
  };

  const addToItinerary = (event, location) => {
    event.stopPropagation();
    console.log(location);

    if (localStorage.token) {
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
          localStorage.token = ""
          alert("Please login to complete this action")
        } else {
          fetch("http://owenhar1.asuscomm.com:3000/api/getItineraryList", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "token": localStorage.token
            })
          }).then((res) => res.json()).then((data) => {
            console.log(data)
            if (data.error) {
              console.error(data)
            } else {
              setIt(data)
              setPlace(location)
            }
          })

        }
      })

    } else {
      alert("Please login to complete this action")
    }


  }

  const [value, setValue] = useState(dayjs())


  return (
    <div className="container">
      <AppBarComponent />
      <div className="sidebar">
        <div className="filters"></div>
        <div className="search">
          <SearchComponent setLocations={setLocations} />
        </div>
        <h2 style={{ textAlign: 'center' }}>Recommendations for You</h2>
        <div className='grid-container'>
          {recommendedLocations.map((location, index) => (
            <TileComponent
              key={index}
              location={location}
              onLocationSelect={setSelectedLocation}
              onToggleFavorite={toggleFavorite}
              addToItinerary={addToItinerary}
              onOpenReviewComponent={openReviewComponent}
            />
          ))}
        </div>
      </div>
      <h2 style={{ textAlign: 'center' }}>Popular Destinations</h2>
      <div className="grid-container">
        {locations.map((location, index) => (
          <TileComponent
            key={index}
            location={location}
            onLocationSelect={setSelectedLocation}
            onToggleFavorite={toggleFavorite}
            addToItinerary={addToItinerary}
            onOpenReviewComponent={openReviewComponent}
          />

        ))}
      </div>
      {selectedLocation && (
        <div className="modal-backdrop">
          <div className="modal">
            <img src={selectedLocation.pictureURL || EZTravelLogo} alt="Location" style={{ display: "block", width: "300px" }} />
            <h3>{selectedLocation.name}</h3>
            {selectedLocation.price && <p>Price: ${selectedLocation.price}</p>}
            {selectedLocation.ratings > 0 ? <p>Rating: {selectedLocation.ratings}/5</p> : <p>No available ratings</p>}
            <p>Description: {selectedLocation.description}</p>
            <button onClick={handleClose} className="close-btn">X</button>
            <button onClick={(e) => { e.stopPropagation(); toggleFavorite(selectedLocation.name); }} className="favorite-btn">
              {selectedLocation.isFavorited ? <FavoriteIcon style={{ color: '#F25C5C' }} /> : <FavoriteBorderIcon style={{ color: 'black' }} />}
            </button>
          </div>
        </div>

      )}
      {reviewLocation && (
        <ReviewComponent
          location={reviewLocation}
          onClose={handleCloseReview}
          onSubmit={(id, reviewText, rating) => {
            // Implement the review submission logic here.
            handleCloseReview(); // Close the review modal after submission
          }}
        />
      )}
      {place && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>{place.name}</h3>
            <DateTimePicker
              id="datePicker"
              value={value}
              onChange={setValue}
            ></DateTimePicker>
            <p>Select an Itinerary to add to:</p>
            {itineraries.map((it) => (
              <Button
                type="item"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#2484BF' }}
                style={{ backgroundColor: '#2484BF' }}
                onClick={() => {
                  fetch("http://owenhar1.asuscomm.com:3000/api/addPlace", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      "token": localStorage.token,
                      "id": it._id,
                      "place": place._id,
                      "time_start": value.unix()
                    })
                  }).then((res) => res.json()).then((data) => {
                    console.log(data)
                    if (data.error) {
                      console.error("Failed to create item")
                    } else {
                      setIt()
                      setPlace()
                    }
                  })
                }}
              >
                {it.title}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
