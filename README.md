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


Here is a suitable README.md for the project:

```md
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
```

## Prerequisites

Before running the application, make sure you have:

- Node.js (v18 or above)
- npm
- MongoDB running locally or a MongoDB Atlas connection string

## Backend Setup

1. Open a terminal and navigate to the backend folder:

```bash
cd Backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `Backend` folder with the following values:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

4. Start the backend server:

```bash
npm run dev
```

The backend will run on:

```bash
http://localhost:5000
```

## Frontend Setup

1. Open a new terminal and go to the frontend folder:

```bash
cd leave-management-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend:

```bash
npm run dev
```

The frontend will run on:

```bash
http://localhost:5173
```

## API Endpoints

The backend exposes the following routes under `/api/auth`:

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/profile` - Fetch protected user profile
- `POST /api/auth/apply_leave` - Submit a leave request
- `GET /api/auth/my_leaves` - Get logged-in user's leave requests
- `POST /api/auth/update_leave` - Update leave status (manager only)
- `GET /api/auth/all_leaves` - Fetch all leave requests (manager only)

## User Roles

- `employee` - Can apply for leave and view their own leave status
- `manager` - Can approve/reject employee leave requests and view all leave records

## Database Models

The backend includes:

- `User` model
  - name
  - email
  - password
  - role

- `Leave` model
  - userid
  - fromDate
  - toDate
  - reason
  - status

## Notes

- The frontend and backend are separate apps and must be started independently.
- Manager-only routes require a valid JWT token with `role: "manager"`.
- The application uses MongoDB for persistence, so ensure the database is reachable before starting the API.

## License

This project is currently unlicensed unless added later.

## Contributing

Feel free to fork the repository and submit pull requests for improvements or new features.

## Contact

