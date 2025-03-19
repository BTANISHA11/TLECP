"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import {
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineBookmark,
  HiOutlineStop,
  HiOutlineBell,
} from "react-icons/hi";

interface NavbarProps {
  upcomingContestCount: number; // Count of upcoming contests
  onEmailNotification: () => void; // Function to handle email notification
  onNotificationClick: () => void; // Function to handle notification click
}

const Navbar: React.FC<NavbarProps> = ({ upcomingContestCount, onEmailNotification, onNotificationClick }) => {
  const { isDark, toggleDarkMode } = useTheme();
  const pathname = usePathname();

  const getIconContainerClasses = (path: string) => {
    const baseClasses = "p-3 rounded-full transition-colors duration-300";
    if (pathname === path) {
      return isDark
        ? `${baseClasses} bg-gray-700 text-gray-100`
        : `${baseClasses} bg-gray-300 text-gray-800`;
    }
    return isDark
      ? `${baseClasses} bg-gray-800 text-gray-100 hover:bg-gray-700`
      : `${baseClasses} bg-gray-200 text-gray-800 hover:bg-gray-300`;
  };

  const labelClasses = "mt-1 text-xs font-medium";
  const navItemClasses = "flex flex-col items-center";

  return (
    <nav
      className={`fixed w-full top-0 z-50 backdrop-blur-lg shadow-md transition-colors duration-300 ${
        isDark ? "bg-gray-900/80" : "bg-white/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold transition-transform transform hover:scale-105"
          >
            Contest Tracker
          </Link>

          <div className="flex items-center space-x-6">
            <span className={navItemClasses}>
              <Link
                href="/BookmarkPage"
                className={getIconContainerClasses("/BookmarkPage")}
              >
                <HiOutlineBookmark className="h-6 w-6" />
              </Link>
              <span className={labelClasses}>Bookmarks</span>
            </span>

            <span className={navItemClasses}>
              <Link
                href="/ContestPage"
                className={getIconContainerClasses("/ContestPage")}
                title="Contests"
              >
                <HiOutlineStop className="h-6 w-6" />
              </Link>
              <span className={labelClasses}>Contests</span>
            </span>

            {/* Notification Icon */}
            <span className={navItemClasses}>
              <button
                onClick={onNotificationClick} // Trigger modal on click
                className={getIconContainerClasses("#")} // Use a placeholder for the link
                title="Upcoming contests within 24 hours!"
              >
                <HiOutlineBell className="h-6 w-6 text-red-500" />
                {upcomingContestCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                    {upcomingContestCount}
                  </span>
                )}
              </button>
              <span className={labelClasses}>Notifications</span>
            </span>

            <span className={navItemClasses}>
              <button
                onClick={toggleDarkMode}
                className={`p-3 rounded-full transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-800 text-gray-100 hover:bg-gray-700"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {isDark ? (
                  <HiOutlineSun className="h-6 w-6 text-yellow-400" />
                ) : (
                  <HiOutlineMoon className="h-6 w-6" />
                )}
              </button>
              <span className={labelClasses}>{isDark ? "Light" : "Dark"}</span>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;