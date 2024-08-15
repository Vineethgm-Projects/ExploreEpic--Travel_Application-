import React, { useState, useEffect } from 'react';
import TourCard from '../../components/TourCard'; // Adjust the path if necessary
import './Wishlist.css'; // Create this CSS file to style the wishlist if needed

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [tours, setTours] = useState([]);
    const storedUserId = localStorage.getItem('userId');
//get the wishlist packages that are added by the user
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                if (!storedUserId) {
                    throw new Error('User ID not found in localStorage');
                }
    
                const response = await fetch(`http://localhost:8080/api/wishlist/${storedUserId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch wishlist: ${response.statusText}`);
                }
    
                const wishlistData = await response.json();
                console.log('Fetched wishlist data:', wishlistData); // Log the fetched data
                setWishlist(wishlistData);
                
                const tourPromises = wishlistData.map(item => 
                    fetch(`http://localhost:8080/api/tours/${item.tourId}`).then(res => res.json())
                );
                const toursData = await Promise.all(tourPromises);
                setTours(toursData);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };
    
        fetchWishlist();
    }, [storedUserId]);

    return (
        <div className="wishlist">
            {wishlist.length === 0 ? (
                <p>No items in wishlist</p>
            ) : (
                tours.map((tour, index) => (
                    tour ? (
                        <TourCard key={index} {...tour} className="tour-cards"/>
                    ) : (
                        <p key={index}>Tour information is missing for this wishlist item.</p>
                    )
                ))
            )}
        </div>
    );
};

export default Wishlist;
