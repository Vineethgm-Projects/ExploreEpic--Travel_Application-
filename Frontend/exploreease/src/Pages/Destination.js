import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TourCard from '../components/TourCard';
import './Destination.css';


//the categories are here of activity
const categories = [
  'Sightseeing',
  'Wildlife',
  'Paragliding',
  'Adventure',
  'City Side',
  'Forest',
];

const Destination = () => {
  const { country } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [tours, setTours] = useState([]);
  const filteredTours = tours.filter(tour => tour.location.includes(country));
  const filteredAndCategorizedTours = selectedCategory
    ? filteredTours.filter(tour => tour.category === selectedCategory)
    : filteredTours;
//change according to category
  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(category);
    }
  };
  useEffect(() => {
    fetch('http://localhost:8080/api/tours') // Adjust the URL to match your backend endpoint
      .then(response => response.json())
      .then(data => setTours(data))
      .catch(error => console.error('Error fetching tours:', error));
  }, []);

  return (
    <div>
      <h2 className="desh2">Destination: {country}</h2>
      <section className="categories">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </div>
        ))}
      </section>

      <div className="destination-container">
        {filteredAndCategorizedTours.map((tour, index) => (
          <Link 
            key={index} 
            to={`/tour/${tour.title}`} 
            state={tour}
            style={{ textDecoration: 'none' }}
          >
            <TourCard {...tour} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Destination;
