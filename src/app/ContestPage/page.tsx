"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxhook";
import {
  fetchContests,
  loadBookmarks,
  toggleSourceFilter,
} from "../../redux/reducer/ContestsSlice";
import ContestList from "../../components/ContestList";
import { useTheme } from "../../components/ThemeProvider";
import Navbar from "../../components/Navbar"; // Importing the Navbar component
import Modal from "../../components/Modal"; // Importing the Modal component
import axios from 'axios'; // Import axios for making API calls

const ContestPage: React.FC = () => {
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();
  const { status, error, sources, selectedSources, contests } = useAppSelector(
    (state) => state.contests
  );
  const [showFilters, setShowFilters] = useState(false);
  const [upcomingContestCount, setUpcomingContestCount] = useState(0); // Count of upcoming contests
  const [upcomingContests, setUpcomingContests] = useState([]); // Store upcoming contests
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  useEffect(() => {
    dispatch(loadBookmarks());
    dispatch(fetchContests());
  }, [dispatch]);

  useEffect(() => {
    const checkUpcomingContests = () => {
      const now = new Date();
      const upcoming = contests.filter(contest => {
        const contestDate = new Date(contest.startTime); // Assuming startTime is in ISO format
        const timeDiff = contestDate.getTime() - now.getTime();
        return timeDiff > 0 && timeDiff <= 24 * 60 * 60 * 1000; // Within the next 24 hours
      });
      setUpcomingContestCount(upcoming.length); // Set the count of upcoming contests
      setUpcomingContests(upcoming); // Set the upcoming contests

      // Send email reminders for contests starting in the next hour
      upcoming.forEach(contest => {
        const contestStartTime = new Date(contest.startTime);
        const oneHourBefore = new Date(contestStartTime.getTime() - 60 * 60 * 1000);
        if (now >= oneHourBefore && now < contestStartTime) {
          sendEmailReminder(contest);
        }
      });
    };

    if (status === "succeeded") {
      checkUpcomingContests();
    }
  }, [contests, status]);

  const sendEmailReminder = async (contest) => {
    try {
      await axios.post('http://localhost:5000/send-reminder', {
        email: 'user-email@example.com', // Replace with the user's email
        contestName: contest.name,
        contestTime: contest.startTime,
      });
      alert(`Reminder sent for contest: ${contest.name}`);
    } catch (error) {
      console.error("Error sending email reminder:", error);
    }
  };

  const handleToggleSource = (source: string) => {
    dispatch(toggleSourceFilter(source));
  };

  const handleEmailNotification = () => {
    // This function would typically call an API to send an email notification
    console.log("Email notification sent for upcoming contests!");
  };

  const handleNotificationClick = () => {
    setIsModalOpen(true); // Open the modal when notification icon is clicked
  };

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
      }`}
    >
      <Navbar 
        upcomingContestCount={upcomingContestCount} 
        onEmailNotification={handleEmailNotification} 
        onNotificationClick={handleNotificationClick} // Pass the click handler
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex justify-start w-full">
           
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center px-4 py-2 rounded-lg border shadow-sm transition-colors duration-200 ${
                isDark
                  ? "bg-gray-800 hover:bg-gray-700 text-white border-gray-600"
                  : "bg-white hover:bg-gray-50 text-gray-800 border-gray-300"
              }`}
            >
              {showFilters ? "Hide Filters" : "Filter by Source"}
            </button>
          </div>
          {showFilters && (
            <div className="flex flex-wrap gap-2">
              {sources.map((src) => {
                const isActive = selectedSources.includes(src.name);
                return (
                  <button
                    key={src.name}
                    onClick={() => handleToggleSource(src.name)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : isDark
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    }`}
                  >
                    {src.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {status === "loading" && (
          <div className="flex justify-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}
        {status === "failed" && (
          <div className="p-4 bg-red-100 border border-red-400 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {status === "succeeded" && (
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-2">🔥</span> Running Contests
              </h2>
              <ContestList type="RUNNING" />
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-2">📅</span> Upcoming Contests
              </h2>
              <ContestList type="UPCOMING" />
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-2">📚</span> Past Contests
              </h2>
              <ContestList type="PAST" />
            </section>
          </div>
        )}
      </div>

      {/* Modal for Upcoming Contests */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        contests={upcomingContests} 
      />
    </div>
  );
};


export default ContestPage;