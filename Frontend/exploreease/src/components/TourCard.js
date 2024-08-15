import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt, faClock, faHeart } from '@fortawesome/free-solid-svg-icons';
import './TourCard.css';
//the card to display the pakage
const TourCard = ({ id, image, title, location, price, duration, rating, featured }) => {
    const [inWishlist, setInWishlist] = useState(false);
    const storedUserId = localStorage.getItem('userId');
//get values from backend
    useEffect(() => {
        const checkWishlistStatus = async () => {
            if (storedUserId) {
                try {
                    const response = await fetch(`http://localhost:8080/api/wishlist/${storedUserId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch wishlist status');
                    }
                    const data = await response.json();
                    const isInWishlist = data.some(item => item.tourId === id);
                    setInWishlist(isInWishlist);
                } catch (error) {
                    console.error('Error checking wishlist status:', error);
                }
            }
        };

        checkWishlistStatus();
    }, [id, storedUserId]);

    return (
        <div className={`tour-card ${inWishlist ? 'in-wishlist' : ''}`}>
            {featured && <div className="tour-card-featured">FEATURED</div>}
            <img src={image} alt={title} className="tour-card-image" />
            <div className="tour-card-content">
                <div className="tour-card-header">
                    <div className="tour-card-title">{title}</div>
                    <div className="tour-card-icons">
                        <FontAwesomeIcon 
                            icon={faHeart} 
                            className={`tour-card-wishlist ${inWishlist ? 'active' : ''}`}
                        />
                    </div>
                </div>
                <div className="tour-card-location">
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {location}
                </div>
                <div className="tour-card-price">From ${price}</div>
                <div className="tour-card-details">
                    <div>
                        <FontAwesomeIcon icon={faClock} /> {duration} hours
                    </div>
                    <div className="star-rating">
                        {Array(5).fill().map((_, i) => (
                            <FontAwesomeIcon
                                key={i}
                                icon={i < rating ? faStarSolid : faStarRegular}
                                className={i < rating ? 'filled-star' : 'unfilled-star'}
                            />
                        ))}({rating})
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourCard;
