import React from 'react';
import './CustomProgressBar.css';

const CustomProgressBar = ({ value, label }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${value}%` }}>
        <span className="progress-bar-label">{label}</span>
      </div>
    </div>
  );
};

export default CustomProgressBar;
