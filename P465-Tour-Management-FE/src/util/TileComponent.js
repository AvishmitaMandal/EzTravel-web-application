import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from "@mui/icons-material/Add"
import RateReviewIcon from '@mui/icons-material/RateReview';


const TileComponent = ({ location, onLocationSelect, onToggleFavorite, addToItinerary,onOpenReviewComponent }) => {
    console.log(location)
    return (
        <div className="grid-item" onClick={() => onLocationSelect(location)}>
            <img src={location.pictureURL} alt="Location" />
            <div className="grid-text">
                <h3>{location.name}</h3>
                {location.price && <p>Price: ${location.price}</p>}
                {location.ratings > 0 ? <p>Rating: {location.ratings}/5</p> : <p>No available ratings</p>}
                <button onClick={(e) => { e.stopPropagation(); onToggleFavorite(location.name); }} className="grid-favorite-btn">
                    {location.isFavorited ? <FavoriteIcon style={{ color: '#F25C5C' }} /> : <FavoriteBorderIcon style={{ color: 'black' }} />}
                </button>
                <button onClick={(event) => addToItinerary(event, location)} className="grid-add-btn">
                    {location.isFavorited ? <AddIcon style={{ color: '#F25C5C' }} /> : <AddIcon style={{ color: 'black' }} />}
                </button>
                <button onClick={(e) => { e.stopPropagation(); onOpenReviewComponent(location); }} className="grid-review-btn">
                    <RateReviewIcon style={{ color: 'gray' }} />
                </button>
            </div>
        </div>
    );
};

export default TileComponent;
