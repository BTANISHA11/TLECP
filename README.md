# Coding Contests Tracker

## Overview
This project provides information about upcoming coding contests from Codeforces, LeetCode, and CodeChef. It fetches contest data from their respective platforms and returns active contests.

## Features
- Retrieve all active contests from Codeforces, LeetCode, and CodeChef.
- Fetch contests from individual platforms.
- Returns contest details including name, start time, duration, and URL.
- View past contests with the last two contests shown for each platform.
- Bookmark contests for easy access.

## Frontend
The frontend of the Coding Contests application is built using React. It provides a user-friendly interface to view active and past contests, bookmark contests, and manage notifications.
### Steps to Run the Frontend
Clone the repository:
```sh
git clone https://github.com/your-repo/coding-contests-frontend.git

cd coding-contests-frontend
```

Install dependencies:

'''sh
npm install
'''
Start the React application:
```sh
npm start
```
The frontend will run on:
```sh
http://localhost:3000
```

# Backend Setup
## Endpoints
### Root Endpoint
### Get All Contests
```http
GET /contests
```
Response:
```json
{
  "status": "success",
  "count": 3,
  "data": [
    {
      "platform": "Codeforces",
      "name": "Contest Name",
      "startTime": "2024-09-15T12:00:00Z",
      "duration": "2 hours 30 minutes",
      "url": "https://codeforces.com/contest/1234"
    }
  ]
}
```

### Get Codeforces Contests
```http
GET /contests/codeforces
```

### Get LeetCode Contests
```http
GET /contests/leetcode
```

### Get CodeChef Contests
```http
GET /contests/codechef
```

### Get Past Contests
```http
GET /contests/past
````
## Installation and Setup
### Prerequisites
- Node.js installed
- npm or yarn installed
- React is installed

### Steps to Run
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/coding-contests-api.git
   cd coding-contests-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   node index.js
   ```
## Dependencies
### Backend
- `express` - Web framework
- `axios` - HTTP requests
- `cors` - Cross-origin requests

### Frontend
- `react` - JavaScript library for building user interfaces
- `react-router-dom` - Routing for React applications
- `axios` - HTTP requests

## Project Live link : 

## Notes
- Ensure your internet connection is active since the API fetches data from external sources.
- The API does not store data; it fetches live data from contest platforms.

