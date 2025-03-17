// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Contests from './components/Contests';
import Home from './components/Home';
import Bookmarks from './components/Bookmark';
import About from './components/About';
import Navbar from './components/Navbar';
import Notifications from './components/Notifications';
import './components/light.css'; // Light theme styles
import './components/dark.css'; // Dark theme styles
import AddYoutubeLink from './components/AddYoutubeLink';
import PastContests from './components/PastContests';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [bookmarkedContests, setBookmarkedContests] = useState([]);

  useEffect(() => {
    // Apply the appropriate theme class to the body
    document.body.className = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  const toggleBookmark = (contest) => {
    if (bookmarkedContests.includes(contest)) {
      setBookmarkedContests(bookmarkedContests.filter(c => c !== contest));
    } else {
      setBookmarkedContests([...bookmarkedContests, contest]);
    }
  };

  return (
    <Router>
      <div className="app">
        <Navbar toggleTheme={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode} />
        <Routes>
        <Route path="/" element={<Home />} /> {/* Set Home as the main landing page */}
          <Route path="/contests" element={<Contests toggleBookmark={toggleBookmark} bookmarkedContests={bookmarkedContests} />} />
          <Route path="/bookmarks" element={<Bookmarks bookmarkedContests={bookmarkedContests} />} />
          <Route path="/about" element={<About />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/add-youtube-link" element={<AddYoutubeLink />} />
          <Route path="/past-contests" element={<PastContests />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;