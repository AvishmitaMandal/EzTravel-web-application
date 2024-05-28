import React, { useState } from 'react';

const ReviewComponent = ({ location, onClose, onSubmit,  }) => {
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);

    return (
        <div className="modal-backdrop">
            <div className="review-modal">
                <h2>Leave a Review for {location.name}</h2>
                <div className="review-input">
                <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Write your review here..."
                />
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    min="1"
                    max="5"
                    placeholder="Rating (1-5)"
                />
                <button onClick={() => onSubmit(location.id, reviewText, rating)} style={{ backgroundColor: '#2484BF', color: 'white'}}>Submit Review</button>
                <button onClick={onClose} style={{ backgroundColor: '#2484BF', color: 'white'}}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default ReviewComponent;
