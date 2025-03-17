// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Create a CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Contest Tracker</h1>
      <p>Your one-stop solution to track coding contests from various platforms.</p>
      <div className="button-container">
        <Link to="/contests" className="home-button">View Contests</Link>
        <Link to="/bookmarks" className="home-button">Your Bookmarks</Link>
        <Link to="/about" className="home-button">About Us</Link>
        <Link to="/notifications" className="home-button">Notifications</Link>
      </div>
    </div>
  );
};

export default Home;