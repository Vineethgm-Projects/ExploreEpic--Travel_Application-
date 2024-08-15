import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
//this is the card displaying the country name with image
const Card = ({ image, title, tours, link }) => {
  return (
    <Link to={link}>
      <div className="card">
        <img className="card-image" src={image} alt={title} />
        <div className="card-content">
          <h3>{title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
