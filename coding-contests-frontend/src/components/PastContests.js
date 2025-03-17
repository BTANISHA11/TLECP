// src/components/PastContests.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Contests.css';

const PastContests = () => {
  const [pastContests, setPastContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchPastContests = async () => {
      try {
        const response = await axios.get('http://localhost:4000/contests/past');
        setPastContests(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPastContests();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="contests-container">
      <h1>Past Contests</h1>
      <button onClick={() => navigate('/contests')} className="back-button">Back to Contests</button>
      {pastContests.map(platformData => (
        <div key={platformData.platform} className="platform-section">
          <h2>{platformData.platform}</h2>
          <ul>
            {platformData.contests.map(contest => (
              <li key={contest.startTime} className="contest-item">
                <h2 className="contest-name">{contest.name} ({contest.platform})</h2>
                <p className="platform">Platform: {contest.platform}</p>
                <p className="start-time">Started at: {new Date(contest.startTime).toLocaleString()}</p>
                <p className="duration">Duration: {contest.duration}</p>
                <a href={contest.url} target="_blank" rel="noopener noreferrer" className="join-button">Join Contest</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PastContests;