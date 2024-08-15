import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './TourPage.css'; // Create and style this CSS file as needed

const TourPage = () => {
  const [reservations, setReservations] = useState([]);
  const [tourDetails, setTourDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const userId = localStorage.getItem('userId');
//the reserved tour details
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/reservations/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }
        const data = await response.json();
        setReservations(data);

        // Fetch tour details for each reservation
        const tourDataPromises = data.map(reservation =>
          fetch(`http://localhost:8080/api/tours/${reservation.tourId}`)
        );
        const tourDataResponses = await Promise.all(tourDataPromises);
        const tourData = await Promise.all(tourDataResponses.map(res => res.json()));

        const tourDetailsMap = {};
        tourData.forEach(tour => {
          tourDetailsMap[tour.id] = tour.title; // Assuming the tour title is stored in `title`
        });
        setTourDetails(tourDetailsMap);

      } catch (error) {
        console.error('Error fetching reservations or tour details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, [userId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (reservations.length === 0) {
    return <p>No reservations found.</p>;
  }

  return (
    <div className="reservations1">
      <h2>Your Reservations</h2>
      <div className="reservations-container1">
        {reservations.map((reservation, index) => (
          <div key={index} className="reservation-card1">
            <h3>{tourDetails[reservation.tourId]}</h3>
            <p><strong>Date:</strong> {reservation.dateFrom}</p>
            <p><strong>Members:</strong> {reservation.numberOfMembers}</p>
            <p><strong>Total Amount:</strong> ${reservation.amount}</p>
            <Link to={`/tourplan`} state={{ id: reservation.tourId }}>
              View Tour Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourPage;
