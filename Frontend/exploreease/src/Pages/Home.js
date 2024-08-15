import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './Home.css';
import Card from '../components/Card';
import TourCard from '../components/TourCard';
import Destination from './Destination';
import TourDetail from './TourDetail';
import TourPage from './NavbarPages/TourPage';
import App from '../App';
import TourPlan from './NavbarPages/TourPlan';
import Wishlist from './NavbarPages/Wishlist'; // Import Wishlist component
import CharacterPopup from '../components/CharacterModel'; // Import CharacterPopup component
//the categories
const activities = [
  "Adventure",
  "Wildlife",
  "Sightseeing",
  "City Side",
  "Relaxation"
];
//values for country card
const data = [
  { image: './images/italymain.jpg', title: 'Italy', tours: 2, category: 'Adventure' },
  { image: '/images/moracoomain.jpg', title: 'Morocco', tours: 6, category: 'Sightseeing' },
  { image: './images/ukmain.jpg', title: 'United Kingdom', tours: 8, category: 'City Side' },
  { image: './images/singaporemain.jpg', title: 'Singapore', tours: 5, category: 'City Side' },
  { image: './images/hungurymain.jpg', title: 'Hungary', tours: 3, category: 'Forest' },
  { image: './images/southafricamain.jpg', title: 'South Africa', tours: 7, category: 'Sightseeing' },
  { image: './images/greecemain.jpg', title: 'Greece', tours: 2, category: 'Forest' },
  { image: './images/usmain.jpg', title: 'United States', tours: 9, category: 'Adventure' },
];

function Home() {
  const [destination, setDestination] = useState('');
  const [activity, setActivity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(true); // Popup is initially open
  const [showPopupButton, setShowPopupButton] = useState(!isPopupOpen); // Show button when popup is closed
  const [showPopup, setShowPopup] = useState(true); 
//get values of tour card
  useEffect(() => {
    fetch('http://localhost:8080/api/tours') // Adjust the URL to match your backend endpoint
      .then(response => response.json())
      .then(data => setTours(data))
      .catch(error => console.error('Error fetching tours:', error));
  }, []);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'destination') setDestination(value);
    if (name === 'activity') setActivity(value);
    if (name === 'minPrice') setMinPrice(value);
    if (name === 'maxPrice') setMaxPrice(value);
  };
//search feature of the code
  const handleSearch = (e) => {
    e.preventDefault();

    const filtered = tours.filter(tour => {
      const matchesDestination = destination ? tour.location.toLowerCase().includes(destination.toLowerCase()) : true;
      const matchesActivity = activity ? tour.category.toLowerCase().includes(activity.toLowerCase()) : true;
      const matchesMinPrice = minPrice ? tour.price >= parseFloat(minPrice) : true;
      const matchesMaxPrice = maxPrice ? tour.price <= parseFloat(maxPrice) : true;

      return matchesDestination && matchesActivity && matchesMinPrice && matchesMaxPrice;
    });

    setFilteredTours(filtered);
    setIsSearchPerformed(true);
  };
//set search value null
  const handleCancelSearch = () => {
    setDestination('');
    setActivity('');
    setMinPrice('');
    setMaxPrice('');
    setFilteredTours([]);
    setIsSearchPerformed(false);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setShowPopupButton(true); // Show the popup button when popup is closed
  };

  const openPopup = () => {
    setIsPopupOpen(true);
    setShowPopupButton(false); // Hide the popup button when popup is opened
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <ConditionalNavBar isLoggedIn={isLoggedIn} />
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section className="hero">
                    <h1>Let's explore</h1>
                    <h2>Where Would You Like To Go?</h2>
                    <p>Checkout Beautiful Places Around the World</p>
                    <form className="search-bar" onSubmit={handleSearch}>
                      <select className='bar' name="destination" value={destination} onChange={handleInputChange}>
                        <option value="" disabled>Select Destination</option>
                        {Array.from(new Set(tours.map(tour => tour.location))).map((location, index) => (
                          <option key={index} value={location}>{location}</option>
                        ))}
                      </select>
                      <select className='bar' name="activity" value={activity} onChange={handleInputChange}>
                        <option value="" disabled>Select Activity</option>
                        {activities.map((act, index) => (
                          <option key={index} value={act}>{act}</option>
                        ))}
                      </select>
                      <input className='bar'
                        type="number"
                        name="minPrice"
                        placeholder="Min Price"
                        value={minPrice}
                        min="1"
                        onChange={handleInputChange}
                      />
                      <input className='bar'
                        type="number"
                        name="maxPrice"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={handleInputChange}
                      />
                      <button className='bar' type="submit">Search</button>
                    </form>
                    <div className="cancelsearchdiv">
                      {isSearchPerformed ? (<button onClick={handleCancelSearch} className="transparent-button">Cancel Search</button>) : (<div></div>)}
                    </div>
                  </section>

                  {isSearchPerformed ? (
                    <section>
                      <h2 className="popular">Search Results</h2>
                      <div className="tour-cards-container">
                        {filteredTours.length > 0 ? (
                          filteredTours.map((tour, index) => (
                            <div key={index}>
                              <Link
                                to={`/tour/${tour.title}`}
                                state={tour}
                                style={{ textDecoration: 'none' }}
                              >
                                <TourCard {...tour} className="tour-cards"/>
                              </Link>
                            </div>
                          ))
                        ) : (
                          <p>No tours found matching the search criteria.</p>
                        )}
                      </div>
                    </section>
                  ) : (
                    <>
                      <section>
                        <h2 className="popular">Go and Explore</h2>
                        <div className="card-container">
                          {data.map((item, index) => (
                            <Card
                              className="card"
                              key={index}
                              image={item.image}
                              title={item.title}
                              tours={item.tours}
                              link={`/destination/${item.title}`}
                            />
                          ))}
                        </div>
                      </section>
                      <hr />
                      <section>
                        <h2 className="popular">Top Tour Spots</h2>
                        <div className="tour-cards-container">
                          {tours.map((tour, index) => (
                            <div key={index}>
                              <Link
                                to={`/tour/${tour.title}`}
                                state={tour}
                                style={{ textDecoration: 'none' }}
                              >
                                <TourCard {...tour} className="tour-cards"/>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </section>  
                    </>
                  )}
                </>
              }
            />
            <Route path="/destination/:country" element={<Destination tours={tours} />} />
            <Route path="/tour/:title" element={<TourDetail />} />
            <Route path="/signin" element={<App />} />
            <Route path="/wishlist" element={<Wishlist />} /> {/* Add wishlist route */}
            <Route path="/tourpage" element={<TourPage />} />
            <Route path="/tourplan" element={<TourPlan/>} />
          </Routes>
        </main>
        {isPopupOpen && <CharacterPopup onClose={closePopup} />}
        {showPopupButton && (
          <div className="popup-button" onClick={openPopup}>
            <img src="../images/char.png" alt="Open Popup" />
          </div>
        )}
      </div>
    </Router>
  );
}

const ConditionalNavBar = ({ isLoggedIn }) => {
  //navbar that does not display on signin page
  const location = useLocation();
  const showNavBar = location.pathname !== '/signin';
  const profilePhotoUrl = localStorage.getItem('profilePhotoUrl');
  const userEmail = localStorage.getItem('userEmail');
  const username = localStorage.getItem('username'); // Add username retrieval
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('profilePhotoUrl');
    localStorage.removeItem('userName'); // Remove username on logout
    window.location.reload(); // Reload to refresh the navbar
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return showNavBar ? (
    <nav className="navbar">
      <div className="logo">Explore Epic</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/tourpage">Tours Page</Link></li>
        <li><Link to="/wishlist">Wishlist</Link></li> {/* Update navigation bar */}
      </ul>
      <div className="auth-button">
        {!isLoggedIn ? (
          <button className="black-button"><Link to="/signin">Sign In/Login</Link></button>
        ) : (
          <div className="profile-photo-container">
            <img
              src={profilePhotoUrl}
              alt="Profile"
              onClick={toggleDropdown}
              style={{ cursor: 'pointer', borderRadius: '50%' }}
            />
            {dropdownVisible && (
              <div className="dropdown-menu">
                <div className="dropdown-item">
                  <p>{username}</p>
                  <p>{userEmail}</p>
                </div>
                <button onClick={handleLogout} className="dropdown-item">Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  ) : null;
};

export default Home;
