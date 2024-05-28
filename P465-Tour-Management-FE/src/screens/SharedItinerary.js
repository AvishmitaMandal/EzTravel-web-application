import { useSearchParams } from "react-router-dom";
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

function SharedItinerary() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [itinerary, updateItinerary] = useState(null);
    const [refresh, setRefresh] = useState();
    const [selected, setSelect] = useState();

    const defaultTheme = createTheme();

    let id = searchParams.get("id");
    useEffect(() => {
        if (id) {
            console.log("Im fetching");
            fetch("http://owenhar1.asuscomm.com:3000/api/getSharedItinerary/" + id)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    updateItinerary(data)
                })
        } else {
            console.log("No ID Found")
        }
    }, [])

    const Itinerary = ({ item }) => {

        const [places, setPlaces] = useState([])
        const [selectedLocation, setSelectedLocation] = useState(null);

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
                let filtered = placesArray.filter((place) => place !== null);
                setPlaces(filtered.toSorted((a, b) => a.time_start - b.time_start));
            }

            fetchPlaces();
        }, [])


        const activities = item.activities.map((item) => {
            return (
                <li>{item}</li>
            )
        })

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
                <div key={index} className="list-item" onClick={() => setSelectedLocation(location)}>
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
                    window.location.reload()
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
                                {localStorage.token ? (
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, backgroundColor: '#2484BF' }}
                                        style={{ backgroundColor: '#2484BF' }}
                                    >
                                        Send Comment
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        disabled
                                        sx={{ mt: 3, mb: 2, backgroundColor: '#2484BF' }}
                                        style={{ backgroundColor: '#2484BF' }}
                                    >
                                        Send Comment
                                    </Button>
                                )}
                            </Box>
                        </Box>
                        {selectedLocation && (
                            <div className="modal-backdrop">
                                <div className="modal">
                                    <img src={selectedLocation.pictureURL || EZTravelLogo} alt="Location" style={{ display: "block", width: "300px" }} />
                                    <h3>{selectedLocation.name}</h3>
                                    <p>Price: ${selectedLocation.price}</p>
                                    <p>Rating: {selectedLocation.rating}</p>
                                    <p>Description: {selectedLocation.description}</p>
                                    <button onClick={handleClose} className="close-btn">X</button>
                                </div>
                            </div>

                        )}
                        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
                    </Container>
                </ThemeProvider>
            </>
        )
    }

    var toRender = (
        <h1>404 Page Not Found</h1>
    )
    if (id && !itinerary) {
        toRender = (
            <>
                <h1>Itinerary</h1>
            </>
        )
    } else if (id && itinerary) {
        toRender = <Itinerary item={itinerary}></Itinerary>
    }

    return (
        <>
            <AppBarComponent></AppBarComponent>
            {toRender}
        </>
    )


}



export default SharedItinerary;