# Attendance system Backend

Attendance system backend is a role based attendance management API built with Node.js, Express and MongoDB.
The system supports admin users and field agents with secure authentication, cookie based JWT handling and scalable modular architecture.

## Tech Stack

Node.js
Express.js
MongoDB with Mongoose
JWT Authentication
Cloudinary Media Storage

## Architecture Overview

The backend follows a layered structure.

Routes handle endpoint definitions.
Controllers manage business logic.
Models define database schemas.
Middlewares handle authentication, file uploads and error handling.
Utils provide reusable helpers like token generation and response formatting.

Server boot flow:

index.js initializes environment and database
app.js registers middleware and routes

## Base API URL

/api/v1

## Main Modules

User module handles authentication, avatar upload and session management.
Attendance module manages daily and monthly attendance.
Admin module manages field agents and reports.

## Authentication

The system uses access tokens and refresh tokens stored inside cookies.
Access tokens are short lived and refreshed automatically.
Refresh tokens are rotated and validated against database records.

Roles supported:
admin
FE

## Response Structure

Every response follows a unified format.

statusCode
data
message

## Environment Variables

PORT
DB_URL
DB_NAME
ACCESS_TOKEN_SECRET
REFRESH_TOKEN_SECRET
ACCESS_TOKEN_EXPIRY
REFRESH_TOKEN_EXPIRY

## Setup

npm install
npm run dev

## Folder Structure

src
config contains environment and cookie configuration
controllers contain request logic
db handles database connection
middlewares handle auth and errors
models define mongoose schemas
routes define API endpoints
utils contains helpers

For detailed API endpoints see docs/API.md
