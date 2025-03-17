// src/components/About.js
import React from 'react';
import './About.css'; // Import the CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <h1>About Contest Tracker</h1>
      <p>This application helps you track coding contests from various platforms.</p>
      <h2>Example Contests</h2>
      <ul className="example-contests">
        <li>
          <strong>LeetCode Weekly Contest 200</strong> - Starts at: September 15, 2023, 14:00 UTC
        </li>
        <li>
          <strong>CodeChef Long Challenge</strong> - Starts at: September 10, 2023, 15:00 UTC
        </li>
        <li>
          <strong>Codeforces Round #1234</strong> - Starts at: September 12, 2023, 12:00 UTC
        </li>
        <li>
          <strong>LeetCode Biweekly Contest 50</strong> - Starts at: September 8, 2023, 14:00 UTC
        </li>
        <li>
          <strong>CodeChef Starters 50</strong> - Starts at: September 5, 2023, 15:00 UTC
        </li>
      </ul>
    </div>
  );
};

export default About;