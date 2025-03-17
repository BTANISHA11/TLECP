// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Notifications from './Notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const fetchUpcomingContests = async () => {
      try {
        const response = await axios.get('http://localhost:4000/contests');
        const contests = response.data.data;

        const now = new Date();
        const upcoming = contests.filter(contest => {
          const startTime = new Date(contest.startTime);
          return startTime > now && startTime <= new Date(now.getTime() + 24 * 60 * 60 * 1000);
        });

        setUpcomingContests(upcoming);
      } catch (error) {
        console.error('Error fetching contests:', error);
      }
    };

    fetchUpcomingContests();
  }, []);

  return (
    <nav className="navbar">
      <h1 className="logo">Contest Tracker</h1>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contests">Contests</Link>
        </li>
        <li>
          <Link to="/bookmarks">Bookmarks</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <button onClick={() => setShowNotifications(!showNotifications)} className="notification-icon">
            <FontAwesomeIcon icon={faBell} />
            {upcomingContests.length > 0 && <span className="notification-count">{upcomingContests.length}</span>}
          </button>
          {showNotifications && <Notifications upcomingContests={upcomingContests} />}
        </li>
        <li>
          <button onClick={toggleTheme}>
            Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;