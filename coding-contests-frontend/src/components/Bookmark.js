// src/components/Bookmarks.js
import React from 'react';

const Bookmarks = ({ bookmarkedContests }) => {
  return (
    <div>
      <h1>Your Bookmarked Contests</h1>
      {bookmarkedContests.length === 0 ? (
        <p>You have no bookmarked contests.</p>
      ) : (
        <ul>
          {bookmarkedContests.map((contest, index) => (
            <li key={index} className="contest-item">
              <h2 className="contest-name">{contest.name} ({contest.platform})</h2>
              <p className="platform">Platform: {contest.platform}</p>
              <p className="start-time">Starts at: {new Date(contest.startTime).toLocaleString()}</p>
              <p className="duration">Duration: {contest.duration}</p>
              <a href={contest.url} target="_blank" rel="noopener noreferrer" className="join-button">Join Contest</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookmarks;