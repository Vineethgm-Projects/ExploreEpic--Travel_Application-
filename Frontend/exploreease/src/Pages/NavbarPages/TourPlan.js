import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './TourPlan.css';

const TourPlan = () => {
  const [tourDetails, setTourDetails] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userPosition, setUserPosition] = useState(null);
  const location = useLocation();
  const tourId = location.state?.id;

  const timelineRef = useRef(null);
  const [progressHeight, setProgressHeight] = useState(0);
//get each destination and set for the location
  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/tours/${tourId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tour details');
        }
        const data = await response.json();
        setTourDetails(data);
      } catch (error) {
        console.error('Error fetching tour details:', error);
      }
    };

    const fetchDestinations = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/destinations/tour/${tourId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch destinations');
        }
        const data = await response.json();
        setDestinations(data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };

    if (tourId) {
      Promise.all([
        fetchTourDetails(),
        fetchDestinations(),
      ]).then(() => setIsLoading(false));
    } else {
      console.error('No tour ID provided');
      setIsLoading(false);
    }
  }, [tourId]);

  useEffect(() => {
    const updatePosition = (position) => {
      const { latitude, longitude } = position.coords;
      setUserPosition({ latitude, longitude });
    };

    const handleError = (error) => {
      console.error('Error getting user position:', error);
    };

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(updatePosition, handleError, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (userPosition && destinations.length > 0) {
      let completedSteps = 0;

      destinations.forEach((destination, index) => {
        const distance = calculateDistance(
          userPosition.latitude,
          userPosition.longitude,
          destination.latitude,
          destination.longitude
        );

        // Assuming 1 km radius as the point where a destination is "reached"
        if (distance < 1) {
          completedSteps = index + 1;
        }
      });

      const progress = (completedSteps / destinations.length) * 100;
      setProgressHeight(progress);
    }
  }, [userPosition, destinations]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!tourDetails) {
    return <p>No tour details found.</p>;
  }

  return (
    <div className="tour-detail2">
      <h2>{tourDetails.title}</h2>
      <p><strong>About:</strong> {tourDetails.description}</p>
      <p><strong>Price:</strong> ${tourDetails.price}</p>
      <p><strong>Location:</strong> {tourDetails.location}</p>
      <div className="tour-plan2">
        <h3>Tour Plan</h3>
        <div className="tour-plan-timeline2" ref={timelineRef}>
          {destinations.map((destination, index) => (
            <div key={index} className="tour-plan-step2">
              <div className="tour-plan-step-marker2"></div>
              <div className="tour-plan-step-content2">
                <h4>Stop {index + 1}: {destination.name}</h4>
                <p>{destination.description}</p>
              </div>
            </div>
          ))}
          <div className="progress-bar1" style={{ '--progress-height': `${progressHeight}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default TourPlan;
