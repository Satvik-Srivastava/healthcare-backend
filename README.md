
# Healthcare Backend API

Welcome to the Healthcare Backend API, a robust Node. js based RESTful API designed to manage patient, doctor, and mapping data for a healthcare management system. In this, there are 3 roles which I have considered are : 
- admin/user (only this person has access to add, delete, and update both doctors & patients).
- Patients
- Doctor 

## Features
- User authentication and authorization
- CRUD operations for patients, doctors, and mappings
- JWT-based token management (access and refresh tokens)
- Input validation using express-validator

## Project Structure
```
HEALTHCARE-BACKEND/
├── config/              # Database configuration
├── controllers/         # API logic for different entities
├── middleware/          # Authentication and error handling middleware
├── models/              # Mongoose schemas
├── node_modules/        # Dependencies (ignored in Git)
├── routes/              # API route definitions
├── validators/          # Input validation rules
├── .env                 # Environment variables (not tracked)
├── .gitignore           # Specifies ignored files
├── package.json         # Project dependencies and scripts
├── package-lock.json    # Locked dependency versions
└── server.js            # Entry point of the application
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/healthcare-backend.git
   cd healthcare-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   npm install cors dotenv express express-validator jsonwebtoken mongoose
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   ACCESS_TOKEN_EXPIRES=15m
   REFRESH_TOKEN_EXPIRES=7d
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints
- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - Login and get tokens
- **POST /api/auth/refresh** - Refresh access token
- **POST /api/auth/logout** - Logout user
- **POST /api/patients** - Create a patient
- **GET /api/patients** - Get all patients
- **GET /api/patients/:id** - Get patient by ID
- **PUT /api/patients/:id** - Update patient
- **DELETE /api/patients/:id** - Delete patient
- **POST /api/doctors** - Create a doctor
- **GET /api/doctors** - Get all doctors
- **GET /api/doctors/:id** - Get doctor by ID
- **PUT /api/doctors/:id** - Update doctor
- **DELETE /api/doctors/:id** - Delete doctor
- **POST /api/mappings** - Create a mapping
- **GET /api/mappings** - Get all mappings
- **GET /api/mappings/patient/:patientId** - Get mappings for a patient
- **DELETE /api/mappings/:id** - Delete a mapping



