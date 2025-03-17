// src/components/YoutubeLink.js
import React, { useState } from 'react';
import axios from 'axios';

const YoutubeLink = () => {
  const [contestId, setContestId] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/add-youtube-link', { contestId, youtubeLink });
      alert('YouTube link added successfully!');
      setContestId('');
      setYoutubeLink('');
    } catch (error) {
      console.error('Error adding YouTube link:', error);
      alert('Failed to add YouTube link.');
    }
  };

  return (
    <div>
      <h2>Add YouTube Link to Contest</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Contest ID:</label>
          <input type="text" value={contestId} onChange={(e) => setContestId(e.target.value)} required />
        </div>
        <div>
          <label>YouTube Link:</label>
          <input type="url" value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} required />
        </div>
        <button type="submit">Add Link</button>
      </form>
    </div>
  );
};

export default YoutubeLink;