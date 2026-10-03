# Leave Management System

A full-stack leave management application built with React on the frontend and Node.js/Express on the backend. It allows employees to register, log in, apply for leaves, and track their leave history, while managers can review and update leave requests.

## Features

- Employee registration and login
- JWT-based authentication
- Secure password hashing using bcrypt
- Apply for leave with date range and reason
- View personal leave history
- Manager role-based access control
- Approve or reject leave requests
- Manager dashboard for all leave records
- Search and filter leave requests by status/date
- Responsive frontend built with React + Vite

## Tech Stack

- Frontend: React, Vite, React Router DOM
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Authentication: JWT + bcrypt
- Styling: CSS

## Project Structure

```bash
Leave_Management_System/
├── Backend/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── ...
├── leave-management-frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── ...
├── README.md
├── package.json
├── package-lock.json
└── playground-1.mongodb.js
