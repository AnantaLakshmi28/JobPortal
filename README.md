# MERN Stack Job Posting Application

A full-stack web application built with MongoDB, Express.js, React.js, and Node.js for posting and managing job listings.

## Features

- **User Authentication**: JWT-based authentication system with secure login
- **Dashboard**: Clean and responsive dashboard interface with sidebar navigation
- **Job Posting**: Create new job listings with title, description, company name, and application deadline
- **Job Management**: View all posted jobs in a organized list
- **Customer Analysis**: Visual data representation using Chart.js with monthly statistics
- **Profile Section**: User profile management area
- **Responsive Design**: Mobile-friendly UI that works on all devices

## Project Structure

- `backend/` — Express.js API server with MongoDB integration
- `frontend/` — React application built with Vite

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file with:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```
4. Start the server: `npm run dev` or `npm start`

### Frontend Setup

1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and get JWT token
- `GET /api/jobs` - Get all jobs (requires authentication)
- `POST /api/jobs` - Create a new job (requires authentication)

## Technologies Used

- **Frontend**: React, React Router, Chart.js, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt
- **Styling**: CSS with responsive design
