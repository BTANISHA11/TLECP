"use client";

import React from "react";

interface Contest {
  name: string;
  startTime: string; // Assuming startTime is in ISO format
  description: string; // Add any other details you want to show
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  contests: Contest[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, contests }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Upcoming Contests</h2>
        {contests.length === 0 ? (
          <p>No upcoming contests in the next 24 hours.</p>
        ) : (
          contests.map((contest, index) => (
            <div key={index} className="mb-4 border-b pb-2">
              <h3 className="text-lg font-semibold">{contest.name}</h3>
              <p className="text-sm text-gray-600">Start Time: {new Date(contest.startTime).toLocaleString()}</p>
              <p>{contest.description}</p>
            </div>
          ))
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};


export default Modal;