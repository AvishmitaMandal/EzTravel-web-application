import React from 'react';
import { InputBase, IconButton, Paper, dividerClasses } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
function SearchComponent({ setLocations }) {
    const [items, setItems] = React.useState([]);

    const keyHandler = (event) => {
        // console.log(event.key)
        let input = document.getElementById("searchBox");
        let popup = document.querySelector('.popup')

        if (event.key == "Backspace" && input.value.length <= 1) {
            setItems([]);
            popup.classList.remove("focus")
        } else {
        fetch(`http://10.1.1.111:3001/place/search?q=${input.value}`)
            .then(response => response.json())
            .then(data => {
                console.log(data, data.places)
                setItems(data.places)
                popup.classList.add("focus")
            })
            .catch(error => console.log('Error fetching locations:', error));
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let input = document.getElementById("searchBox");
        document.querySelector('.popup').classList.remove('focus')
        if (input.value == "") {
            fetch('http://10.1.1.111:3001/places')
            .then(response => response.json())
            .then(data => setLocations(data.places))
            .catch(error => console.log('Error fetching locations:', error));
        } else {
            fetch(`http://10.1.1.111:3001/place/search?q=${input.value}`)
            .then(response => response.json())
            .then(data => setLocations(data.places))
            .catch(error => console.log('Error fetching locations:', error));
        }


    }

    const autoClick = (name) => {
        let input = document.getElementById("searchBox");
        document.querySelector('.popup').classList.remove('focus')
        input.value = "";
            fetch(`http://10.1.1.111:3001/place/search?q=${name}`)
            .then(response => response.json())
            .then(data => setLocations(data.places))
            .catch(error => console.log('Error fetching locations:', error));
    }

    let itemsRender = items.map((place) => {
        return (
            <div class="item" onClick={(event) => autoClick(place.name)}>{place.name}</div>
        )
    })

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Paper component="form" onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '2px 4px', margin: '0 auto', border: '1px solid #2484BF' }}>
            <div class="box">
                <IconButton type="submit" aria-label="search" style={{ color: '#2484BF', padding: '10px' }}>
                    <SearchIcon />
                </IconButton>
                
                <InputBase
                    placeholder="Search"
                    style={{ marginLeft: '10px', flex: 1, fontFamily:'monospace'}}
                    inputProps={{ 'aria-label': 'search' }}
                    id = "searchBox"
                    onKeyDown={keyHandler}
                    autoComplete='off'
                >
                </InputBase>
                <div class="popup">
                    {itemsRender}
                </div>
                </div>
                
            </Paper>
        </div>
    )
}
export default SearchComponent;
