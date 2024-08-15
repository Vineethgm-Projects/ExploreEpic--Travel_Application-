import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Rating from 'react-rating-stars-component';
import CustomProgressBar from '../components/CustomProgressBar';
import { FaLock } from 'react-icons/fa'; 
import './TourDetail.css';

const TourDetail = () => {
  const { state } = useLocation();
  const [dateFrom, setDateFrom] = useState('');
  const [member, setMember] = useState('');
  const [reviews, setReviews] = useState([]);
  const [inWishlist, setInWishlist] = useState(false);
  const [userId, setUserId] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [isReserved, setIsReserved] = useState(false);

  //get values for the tour card
  const storedUserId = localStorage.getItem('userId');
  const {
    id,
    image,
    image1,
    image2,
    title,
    location,
    price,
    duration,
    ageRange,
    startTime,
    mobileTicket,
    liveGuide,
    rating,
    featured,
    category,
    description,
    included,
    availability
  } = state || {};

  //store the username from login to userId state
  useEffect(() => {
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, [storedUserId]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!id) return;
      try {
        const response = await fetch(`http://localhost:8080/api/reviews/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [id]);
//add to wishlist
  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!storedUserId || !id) return;
      try {
        const response = await fetch(`http://localhost:8080/api/wishlist/${storedUserId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch wishlist');
        }
        const wishlistData = await response.json();
        setInWishlist(wishlistData.some(item => item.tourId === id));
      } catch (error) {
        console.error('Error checking wishlist status:', error);
      }
    };

    checkWishlistStatus();
  }, [storedUserId, id]);
//to reserve the package
  useEffect(() => {
    const fetchReservations = async () => {
      if (!storedUserId) return;
      try {
        const response = await fetch(`http://localhost:8080/api/reservations/user/${storedUserId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }
        const data = await response.json();
        setReservations(data);

        // Check if the current tour is already reserved
        const reserved = data.some(reservation => reservation.tourId === id);
        setIsReserved(reserved);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, [storedUserId, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dateFrom') setDateFrom(value);
    if (name === 'member' && value > -1) setMember(value);
  };

  const calculateCancellationDate = (date) => {
    const cancellationDate = new Date(date);
    cancellationDate.setDate(cancellationDate.getDate() - 5);
    return cancellationDate.toISOString().split('T')[0];
  };
//add review to the tour
  const handleAddReview = async (review) => {
    try {
      const response = await fetch(`http://localhost:8080/api/reviews/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });
      if (!response.ok) {
        throw new Error('Failed to add review');
      }
      const data = await response.json();
      setReviews([...reviews, data]);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const handleAddToWishlist = async () => {
    if (inWishlist) {
      console.log('Tour is already in the wishlist.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: storedUserId,
          tourId: id,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add to wishlist');
      }
      const data = await response.json();
      console.log('Added to wishlist:', data);
      setInWishlist(true);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      console.log("userid:",storedUserId)
    }
  };

  const handleReserveNow = async () => {
    if (!dateFrom || !member || !userId) return;

    try {
      const amount = member * price;
      const response = await fetch(`http://localhost:8080/api/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateFrom,
          numberOfMembers: member,
          amount,
          tourId: id,
          userId,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create reservation');
      }
      const data = await response.json();
      console.log('Reservation created:', data);
      setIsReserved(true); // Update state to reflect the reservation
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full">&#9733;</span>);
    }

    if (halfStar) {
      stars.push(<span key="half" className="star half">&#9734;</span>);
    }

    return stars;
  };
//rating of the user given
  const RatingSummary = ({ reviews }) => {
    const totalReviews = reviews.length;
    const averageRating = totalReviews ? 
      reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
      : 0;

    const ratingDistribution = [5, 4, 3, 2, 1].map(stars => 
      reviews.filter(review => review.rating === stars).length
    );

    return (
      <div className="rating-summary">
        <div className="rating-summary-items">
        <h1>{averageRating.toFixed(1)} Out of 5 Stars</h1>
        <p >Overall Stars:</p>
        <p className="overallrating">
        <Rating
          count={5}
          value={averageRating}
          size={24}
          edit={false}
          activeColor="#ffd700"
        />
        </p>
          <p>Overall rating of {totalReviews} reviews</p>
          {ratingDistribution.map((count, index) => (
            <div key={index} className="rating-distribution">
              <span>{5 - index} Stars:</span>
              <CustomProgressBar 
                value={(count / totalReviews) * 100} 
                label={`${count}`} 
              />
            </div>
          ))}
        </div>
      </div>
    );
  };
//form to post review
  const ReviewForm = ({ onAddReview }) => {
    const [name, setName] = useState('');
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      const newReview = { name, rating, comment, date: new Date().toLocaleDateString() };
      onAddReview(newReview);
      setName('');
      setRating(1);
      setComment('');
    };

    return (
      <form onSubmit={handleSubmit} className="review-form">
        <div className="review-form-values">
          <label><strong>Name:</strong></label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label><strong>Rating:</strong></label>
          <Rating
            count={5}
            value={rating}
            onChange={(newRating) => setRating(newRating)}
            size={24}
            activeColor="#ffd700"
          />
        </div>
        <div>
          <label><strong>Comment:</strong></label>
          <textarea 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    );
  };
//to display the posted review
  const ReviewList = ({ reviews }) => {
    const [visibleReviews, setVisibleReviews] = useState(3);

    const showMoreReviews = () => {
      setVisibleReviews(prevVisibleReviews => prevVisibleReviews + 3);
    };

    return (
      <div className="review-list">
        <h2>Reviews</h2>
        {reviews.slice(0, visibleReviews).map((review, index) => (
          <div key={index} className="review-item">
            <div className="rating">
              <Rating
                count={5}
                value={review.rating}
                size={24}
                edit={false}
                activeColor="#ffd700"
              />
            </div>
            <p className="reviewer-name"><strong>{review.name}</strong> - {review.date}</p>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))}
        {visibleReviews < reviews.length && (
          <button className="see-more-button" onClick={showMoreReviews}>
            See More
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="tour-detail">
      <div className="tour-header">
        <h2>{title}</h2>
        <div className="tour-images">
          <img src={image} alt={title} className="main-image" />
          <div className="side-images">
            <img src={image1} alt={title} className="side-image" />
            <img src={image2} alt={title} className="side-image" />
          </div>
        </div>
        <hr/>
      </div>
      <div className="tour-info">
        <div className="tour-info-left">
          <h4 className="side">About:</h4>
          <p className="description">{description}</p>
          <div className="price-section">
            <p>from <span className="price">${price}</span> per adult</p>
          </div>
          <div className="rating">
            <strong>Rating:</strong> {renderStars(rating)}({rating})
          </div>
          <div className="details">
            <p><strong>Ages:</strong> {ageRange}</p>
            <p><strong>Duration:</strong> {duration} hours</p>
            <p><strong>Live Guide:</strong> {liveGuide}</p>
          </div>
          <button 
            className={`wishlist-button ${inWishlist ? 'active' : ''}`} 
            onClick={handleAddToWishlist}
          >
            {inWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
        <div className="tour-info-right">
          <div className="reserve-section">
            <p><strong>Reserve your spot</strong></p>
            <input
              type="date"
              name="dateFrom"
              placeholder="Date From"
              value={dateFrom}
              onChange={handleInputChange}
              className="date-input"
            />
            <input
              type="number"
              name="member"
              placeholder="Members"
              value={member}
              min="1"
              onChange={handleInputChange}
              className="member-input"
            />
            <p><light>{member} Adults x ${price}</light></p>
            <p><strong>Total:</strong> ${member * price}</p>
            <button 
              className="reserve-button" 
              onClick={handleReserveNow}
              disabled={isReserved}
            >
            {!storedUserId && <FaLock className="lock-icon" />}

              {isReserved ? 'Reserved' : 'Reserve Now'}
            </button>
            {!storedUserId && "Login to Reserve"}
            {dateFrom && (
              <p>
                Free cancellation. Cancel anytime before{' '}
                {calculateCancellationDate(dateFrom)} for full refund.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="review-section">
        <div className="review-container">
          <RatingSummary reviews={reviews} />
          <ReviewForm onAddReview={handleAddReview} />
        </div>
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
};

export default TourDetail;