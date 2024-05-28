import AppBarComponent from "../util/AppBarComponent";
import React, { useEffect, useState, image } from 'react'
import EZTravelLogo from '../images/EZTravelLogo.png'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dayjs from "dayjs";
import { DateTimePicker } from '@mui/x-date-pickers';
import { useLoadScript } from '@react-google-maps/api';
import { GoogleMap, MarkerF } from '@react-google-maps/api';


function Itinerary() {
  const defaultTheme = createTheme();

  const [state, setState] = useState();
  const [user, setUser] = useState();
  const [list, setList] = useState();
  const [refresh, setRefresh] = useState();
  const [selected, setSelect] = useState();
  useEffect(() => {
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
          setUser(null)
          setState("no user")
          localStorage.token = ""
        } else {
          setUser(data)
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
              setList()
              setState("logged in")
            } else {
              setList(data)
              setState("logged in")
            }
          })

        }
      })

    } else {
      setUser(null);
      setState("no user");
    }
  }, [refresh]);

  const handleItemClick = async (event) => {
    const id = event.target.id
    if (id === "create") {
      setState("create")
    } else {
      fetch("http://owenhar1.asuscomm.com:3000/api/getItinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "token": localStorage.token,
          "id": id
        })
      }).then((res) => res.json()).then((data) => {
        console.log(data)
        if (data.error) {
          console.error("Failed to fetch item")
        } else {
          setSelect(data)
          setState("item")
        }
      })
    }
  }

  const Itinerary = () => {
    let item = selected

    const [places, setPlaces] = useState([])
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [timeStart, setTimeStart] = useState(dayjs());
    const [timeEnd, setTimeEnd] = useState();



    let tempPlaces = []

    useEffect(() => {
      const fetchPlaces = async () => {
        const placesArray = await Promise.all(
          item.destinations.map(async (dest) => {
            console.log(dest.time_start);
            try {
              console.log(dest)
              const response = await fetch(`http://owenhar1.asuscomm.com:3001/places/${dest.place}`);
              const data = await response.json();
              console.log(data)
              data.place.time_start = dest.time_start;
              if (dest.time_end) {
                data.place.time_end = dest.time_end;
              }
              return data.place;
            } catch (error) {
              console.error(error);
              return null;
            }
          })
        );
        // console.log(placesArray);
        let filtered = placesArray.filter((place) => place !== null);
        setPlaces(filtered.toSorted((a, b) => a.time_start - b.time_start));
      }

      fetchPlaces();
    }, [])
    const deleteItem = async (event) => {
      event.preventDefault();

      fetch("http://owenhar1.asuscomm.com:3000/api/deleteItinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "token": localStorage.token,
          "id": item._id
        })
      }).then((res) => res.json()).then((data) => {
        console.log(data)
        if (data.error) {
          console.error("Failed to delete item")
        } else {
          setSelect()
          setState()
          setRefresh(data)
        }
      })
    }
    const addActivity = async (event) => {
      event.preventDefault();
      const activity = document.getElementById("activity").value;

      fetch("http://owenhar1.asuscomm.com:3000/api/addActivity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "token": localStorage.token,
          "id": item._id,
          "activity": activity
        })
      }).then((res) => res.json()).then((data) => {
        console.log(data)
        if (data.error) {
          console.error("Failed to delete item")
        } else {
          setSelect(data)
        }
      })
    }

    const activities = item.activities.map((item) => {
      return (
        <li>{item.activity}</li>
      )
    })

    const ItineraryMapRender = () => {
      const libraries = ['places'];
      const mapContainerStyle = {
        width: '500px',
        height: '300px',
      };

      const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "",
        libraries,
      });

      console.log(isLoaded, loadError)

      let def_lat = 39.168804
      let def_lng = -86.546659

      if (selected.activities.length > 0) {
        def_lat = selected.activities[0].latitude
        def_lng = selected.activities[0].longitude
      }

      const center = {
        lat: def_lat, // default latitude
        lng: def_lng, // default longitude
      };

      if (!isLoaded) {
        return (
          <div>
            <h1>Loading...</h1>
          </div>
        );
      }

      let markers_activity = selected.activities.map((activity) => {
        return (
          <MarkerF position={{
              "lat": activity.latitude,
              "lng": activity.longitude
          }}
          ></MarkerF>
        )
      })

      let markers_place = places.map((location) => {
        console.log(places)
        return (
          <MarkerF position={{
              "lat": location.latitude,
              "lng": location.longitude
          }}
          ></MarkerF>
        )
      })

      return (
        <>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
          >
            <MarkerF position={center} />
            {markers_activity}
            {markers_place}
          </GoogleMap>
        </>
      );
    }

    const commentsRender = item.comments.map((comment) => {
      console.error(comment);
      return (
        <div class="comment">
          <div class="username">
            <b>{comment.username}</b>
          </div>
          <div class="body">
            {comment.body}
          </div>
        </div>
      );
    })



    const placesRender = places.map((location, index) => {
      return (
        <div key={index} className="list-item" onClick={() => {
          setSelectedLocation(location)
          setTimeStart(dayjs.unix(location.time_start));
          if (location.time_end) setTimeEnd(dayjs.unix(location.time_end))
          }}>
          <img src={location.pictureURL || EZTravelLogo} alt="Location" class="itineraryPicture" />
          <div className="list-text">
            <h3>{location.name}</h3>
            {/* <p>Price: ${location.price}</p> */}
            <p>Rating: {location.rating}</p>
          </div>
          <div class="list-time">
            <p>Arrival Time:</p>
            <p>{dayjs.unix(location.time_start).format('L')}</p>
            <p>{dayjs.unix(location.time_start).format('LT')}</p>
          </div>

        </div>
      )
    })

    const handleClose = () => {
      setSelectedLocation(null);
    };


    const handlePlaceRemove = (event) => {
      console.log("deleting")
      fetch("http://owenhar1.asuscomm.com:3000/api/deletePlace", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "token": localStorage.token,
          "id": selected._id,
          "place": selectedLocation._id
        })
      }).then((res) => res.json())
        .then((data) => {
          setSelectedLocation(null);
          setSelect(data);
          item = selected;
        })
    }

    const handleSubmit = (event) => {
      event.preventDefault()
      const data = new FormData(event.currentTarget);
      console.log(data)
      let dataSend = {
        comment: data.get('body'),
        token: localStorage.token,
        itineraryId: item._id
      };

      console.log(dataSend)

      fetch('http://owenhar1.asuscomm.com:3000/api/addComment', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataSend)
      }).then((res) => res.json())
        .then(data => {
          setSelect(data);
          item = selected;
        })
    }

    const handleTimeChange = () => {
      const dataSend = {
        "token": localStorage.token,
        "id": item._id,
        "place": selectedLocation._id
      }
      if (timeStart) dataSend.time_start = timeStart.unix();
      if (timeEnd) dataSend.time_end = timeEnd.unix();
      fetch('http://owenhar1.asuscomm.com:3000/api/updatePlaceTiming', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataSend)
      }).then((res) => res.json())
        .then(data => {
          setSelectedLocation(null);
          setSelect(data);
          item = selected;
        })
    }

    // Here we will connect with the place db and get the places.
    return (
      <>
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <h2>{item.title}</h2>
              <p>{item.description}</p>

              <div className="itineraryMapRender">
                <ItineraryMapRender />
              </div>

              <ul>
                {activities}
              </ul>
              <div>
                <TextField
                  margin="normal"
                  id="activity"
                  label="New Activity"
                  name="activity"
                />
                <Button
                  type="add"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: '#2484BF' }}
                  style={{ backgroundColor: '#2484BF' }}
                  onClick={addActivity}
                >
                  Add New Item
                </Button>
              </div>
              <ul>
                {placesRender}
              </ul>
              <div class="comments">
                {commentsRender}
              </div>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="body"
                  label="Comment"
                  name="body"
                  autoFocus
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: '#2484BF' }}
                  style={{ backgroundColor: '#2484BF' }}
                >
                  Send Comment
                </Button>
              </Box>

              <Button
                type="delete"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#2484BF' }}
                style={{ backgroundColor: '#2484BF' }}
                onClick={() => {
                  navigator.clipboard.writeText(`http://${window.location.host}/SharedItinerary?id=${item._id}`)
                }}
              >
                Copy Share Link
              </Button>
              <Button
                type="delete"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#2484BF' }}
                style={{ backgroundColor: '#2484BF' }}
                onClick={deleteItem}
              >
                Delete
              </Button>
              <Button
                type="home"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#2484BF' }}
                style={{ backgroundColor: '#2484BF' }}
                onClick={() => {
                  setSelect()
                  setState()
                  setRefresh(Math.random)
                }}
              >
                Back
              </Button>
            </Box>
            {selectedLocation && (
              <div className="modal-backdrop">
                <div className="modal">
                  <img src={selectedLocation.pictureURL || EZTravelLogo} alt="Location" style={{ display: "block", width: "300px" }} />
                  <h3>{selectedLocation.name}</h3>
                  <p>Price: ${selectedLocation.price}</p>
                  <p>Rating: {selectedLocation.rating}</p>
                  <p>Description: {selectedLocation.description}</p>
                  <p>Arrival Time: {dayjs.unix(selectedLocation.time_start).toString()}</p>
                  { selectedLocation.time_end ? (
                    <>
                    <p>Departure Time: {dayjs.unix(selectedLocation.time_end).toString()}</p>
                    <p>Arrival Time:</p>
                    </>
                  ) : (<></>)}
                  <button onClick={handleClose} className="close-btn">X</button>
                  <div>
                    
                    <DateTimePicker
                      value={timeStart}
                      onChange={setTimeStart}
                    />
                  </div>
                  <div>
                    <p>Departure Time:</p>
                    <DateTimePicker
                      value={timeEnd}
                      onChange={setTimeEnd}
                    />
                  </div>
                  <div>
                    <Button onClick={handleTimeChange}>Set Times</Button>
                  </div>
                  <div>
                    <Button onClick={handlePlaceRemove}>Remove</Button>
                  </div>
                </div>
              </div>

            )}
            {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
          </Container>
        </ThemeProvider>
      </>
    )
  }

  const Create = () => {
    const handleSubmit = (event) => {
      event.preventDefault()
      const data = new FormData(event.currentTarget);
      console.log(data)
      let item = {
        title: data.get('title'),
        description: data.get('description'),
        startDate: new Date(document.getElementById("start").value),
        endDate: new Date(document.getElementById("end").value),
        token: localStorage.token
      };
      console.log(item)
      fetch("http://owenhar1.asuscomm.com:3000/api/makeItinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
      }).then((res) => res.json()).then((data) => {
        console.log(data)
        if (data.error) {
          console.error("Failed to create item")
        } else {
          setSelect()
          setState()
          setRefresh(data)
        }
      })
    }
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
            />
            <div>
              <label>Start Date: </label>
              <input id="start" type="date"></input>
            </div>
            <div>
              <label>End Date: </label>
              <input id="end" type="date"></input>
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#2484BF' }}
              style={{ backgroundColor: '#2484BF' }}
            >
              Create
            </Button>
            <Button
              type="home"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#2484BF' }}
              style={{ backgroundColor: '#2484BF' }}
              onClick={() => {
                setSelect()
                setState()
                setRefresh(Math.random)
              }}
            >
              Back
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    )
  }


  const List = (props) => {
    const items = list.map((item) => {
      return (
        <Button onClick={handleItemClick}
          type="button"
          fullWidth
          variant="contained"
          key={item._id}
          id={item._id}
          sx={{ mt: 3, mb: 2 }}
        >
          {item.title}
        </Button>
      )
    })
    return (
      <div>
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
              <h2>Itineraries</h2>
              {items}
              <Button onClick={handleItemClick}
                type="create"
                fullWidth
                variant="contained"
                key="create"
                id="create"
                sx={{ mt: 3, mb: 2 }}
              >
                Create New Itinerary
              </Button>
            </Box>
            {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
          </Container>
        </ThemeProvider>
      </div>
    )
  }

  const Starting = () => {
    return (
      <div>

      </div>
    )
  }

  const Login = () => {
    return (
      <div>
        <h1>Itinerary</h1>
        <h3>Please log in</h3>
      </div>
    )
  }

  let render = <Starting></Starting>;
  if (state === "no user") render = <Login></Login>;
  if (state === "logged in") render = <List></List>
  if (state === "item") render = <Itinerary></Itinerary>
  if (state === "create") render = <Create></Create>



  return (
    <div>
      <AppBarComponent />
      {render}
    </div>
  );
}

export default Itinerary;
