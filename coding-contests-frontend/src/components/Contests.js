// src/components/Contests.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Contests.css';

const Contests = ({ toggleBookmark, bookmarkedContests }) => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get('http://localhost:4000/contests');
        setContests(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Group contests by platform
  const contestsByPlatform = contests.reduce((acc, contest) => {
    if (!acc[contest.platform]) {
      acc[contest.platform] = [];
    }
    acc[contest.platform].push(contest);
    return acc;
  }, {});

  return (
    <div className="contests-container">
      <h1>Active Coding Contests</h1>

      {['LeetCode', 'CodeChef', 'Codeforces'].map(platform => (
        <div key={platform} className="platform-section">
          <h2>{platform}</h2>

          <h3>Upcoming Contests</h3>
          <ul>
            {contestsByPlatform[platform] && contestsByPlatform[platform]
              .filter(contest => new Date(contest.startTime) > new Date())
              .map((contest) => (
                <li key={contest.startTimeUnix} className="contest-item">
                  <h2 className="contest-name">{contest.name} ({contest.platform})</h2>
                  <p className="platform">Platform: {contest.platform}</p>
                  <p className="start-time">Starts at: {new Date(contest.startTime).toLocaleString()}</p>
                  <p className="duration">Duration: {contest.duration}</p>
                  <button onClick={() => toggleBookmark(contest)}>
                    {bookmarkedContests.includes(contest) ? 'Unbookmark' : 'Bookmark'}
                  </button>
                  <a href={contest.url} target="_blank" rel="noopener noreferrer" className="join-button">Join Contest</a>
                </li>
              ))}
          </ul>

          <h3>Past Contests</h3>
          <Link to="/past-contests" className="view-past-contests">View Past Contests</Link>
        </div>
      ))}
    </div>
  );
};

export default Contests;