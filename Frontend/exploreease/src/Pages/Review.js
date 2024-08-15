import React, { useState } from 'react';
import Rating from 'react-rating-stars-component';
import { ProgressBar } from 'react-bootstrap';
import './ReviewRating.css'; // Import your CSS file for styling

const Review = () => {
    const [reviews, setReviews] = useState([]);

    const handleAddReview = (review) => {
        setReviews([...reviews, review]);
    };

    const RatingSummary = () => {
        const totalReviews = reviews.length;
        const averageRating = totalReviews ? 
            reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
            : 0;

        const ratingDistribution = [5, 4, 3, 2, 1].map(stars => 
            reviews.filter(review => review.rating === stars).length
        );

        return (
            <div className="rating-summary">
                <h1>{averageRating.toFixed(1)} Out of 5 Stars</h1>
                <Rating
                    count={5}
                    value={averageRating}
                    size={24}
                    edit={false}
                    activeColor="#ffd700"
                />
                <p>Overall rating of {totalReviews} reviews</p>
                {ratingDistribution.map((count, index) => (
                    <div key={index} className="rating-distribution">
                        <span>{5 - index} Stars:</span>
                        <ProgressBar 
                            now={(count / totalReviews) * 100} 
                            label={`${count}`} 
                            variant="warning" 
                            style={{ marginLeft: '10px', flex: 1 }} 
                        />
                    </div>
                ))}
            </div>
        );
    };

    const ReviewForm = () => {
        const [name, setName] = useState('');
        const [rating, setRating] = useState(1);
        const [comment, setComment] = useState('');

        const handleSubmit = (e) => {
            e.preventDefault();
            const newReview = { name, rating, comment, date: new Date().toLocaleDateString() };
            handleAddReview(newReview);
            setName('');
            setRating(1);
            setComment('');
        };

        return (
            <form onSubmit={handleSubmit} className="review-form">
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Rating:</label>
                    <Rating
                        count={5}
                        value={rating}
                        onChange={(newRating) => setRating(newRating)}
                        size={24}
                        activeColor="#ffd700"
                    />
                </div>
                <div>
                    <label>Comment:</label>
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

    const ReviewList = () => {
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
        <div className="App">
            <h1>Review and Rating Page</h1>
            <div className="summary-section">
                <RatingSummary />
                <ReviewForm />
            </div>
            <ReviewList />
        </div>
    );
};

export default Review;
