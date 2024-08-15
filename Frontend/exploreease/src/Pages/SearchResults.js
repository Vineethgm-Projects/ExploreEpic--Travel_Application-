import React from 'react';
import { useLocation } from 'react-router-dom';
import TourCard from '../components/TourCard';

function SearchResults() {
  const location = useLocation();
  const { filteredTours } = location.state;
  //the search result of the home page

  return (
    <div>
      <h2>Search Results</h2>
      <div className="tour-cards-container">
        {filteredTours.length > 0 ? (
          filteredTours.map((tour, index) => (
            <TourCard key={index} {...tour} className="tour-cards" />
          ))
        ) : (
          <p>No tours fount6ui,m hm8i,7bum6 b8kjm8i57mjuhyunyjgky7ijm75rg6eum5ntd</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
