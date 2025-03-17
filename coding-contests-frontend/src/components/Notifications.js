// src/components/Notifications.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Notifications = ({ upcomingContests }) => {
  return (
    <div className="notifications">
      <h3>
        <FontAwesomeIcon icon={faBell} style={{ marginRight: '2px', color: '#007bff' }} />
        Upcoming Contests (Next 24 hours)
      </h3>
      {upcomingContests.length === 0 ? (
        <p>No upcoming contests in the next 24 hours.</p>
      ) : (
        <ul>
          {upcomingContests.map((contest) => (
            <li key={contest.startTimeUnix}>
              <strong>{contest.name}</strong> ({contest.platform}) - Starts at: {new Date(contest.startTime).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;