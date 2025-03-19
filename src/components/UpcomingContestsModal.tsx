"use client";

import React from "react";

interface Contest {
  name: string;
  startTime: string; // Format: YYYY-MM-DD HH:mm:ss
}

interface UpcomingContestsModalProps {
  contests: Contest[];
  isOpen: boolean;
  onClose: () => void;
}

const UpcomingContestsModal: React.FC<UpcomingContestsModalProps> = ({
  contests,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Upcoming Contests (24H)
        </h2>

        {contests.length > 0 ? (
          <ul className="space-y-3">
            {contests.map((contest, index) => (
              <li key={index} className="p-2 bg-gray-200 dark:bg-gray-800 rounded-md">
                <span className="block font-medium text-gray-900 dark:text-white">
                  {contest.name}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {contest.startTime}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">No contests in the next 24 hours.</p>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UpcomingContestsModal;
