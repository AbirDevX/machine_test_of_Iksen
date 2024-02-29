# Express Application with REST API and Admin Panel

This is an Express.js application that provides a REST API for clients and an admin panel built with EJS templating engine.

## Features

- RESTful API endpoints for client-side operations
- Admin panel built with EJS for managing data and settings
- Authentication and authorization using JWT (JSON Web Tokens)
- Password hashing and encryption using bcrypt
- Input validation using node-input-validator
- Database integration with MongoDB using Mongoose
- Static file serving and dynamic HTML rendering using Express and EJS

## Prerequisites

- Node.js installed on your machine
- MongoDB installed and running locally

## Getting Started

1. Clone the repository:  https://github.com/AbirDevX/machine_test_of_Iksen
2. Install dependencies:
3. Configure environment variables:
   create a ".dev.env" file and variables

   PORT=8000

   MONGO_DB_URL= ****

   ADMIN_SECRET=****

   USER_SECRET=*******

   SERVER_URL=http://localhost:8000
4. The server will start running on port 8000 by default.

## Project Structure

- `server.js`: Main entry point of the server
- `routes/`: Directory for route handling modules
- `controllers/`: Directory for route handlers
- `models/`: Directory for data models (using Mongoose)
- `middleware/`: Directory for middleware functions
- `views/`: Directory for EJS templates (for admin panel)
- `public/ or uploads`/: Directory for static files (CSS, JavaScript, images, etc.)

## Usage

### REST API Endpoints

- Implement your REST API endpoints in the `routes/` directory.
- Use JWT for authentication and authorization.
- Validate input data using node-input-validator.
- Hash and encrypt passwords using bcrypt.

### Admin Panel

- Build your admin panel views using EJS templates in the `views/` directory.
- Use Express routes to render the admin panel pages and handle form submissions.
