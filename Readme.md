# PrimeTradeAi – Delivery Attendance Management System

## Overview

PrimeTradeAi is a role-based delivery attendance management system built with a scalable backend architecture and a simple dashboard interface.

The system allows admins to manage field agents and track their attendance using secure authentication, location tracking, and image verification.

### Roles

**Admin**

* Add and manage field agents (FE)
* View daily, monthly, and specific day attendance
* Monitor check-in / check-out time and location
* Change FE passwords
* Soft delete agents (disable login access)
* View today’s overall working status

**Field Agent (FE)**

* Secure login using cookie-based authentication
* Daily check-in with image and GPS location
* Daily check-out with image and GPS location
* View current day status
* View monthly attendance summary

---

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication (Access + Refresh Tokens)
* Cookie-based auth strategy
* Cloudinary (media storage)

The backend follows a modular and scalable structure using routes, controllers, models, middlewares, and reusable utilities.

### Frontend

* React
* React Router
* Axios
* Context API
* Vite

Role-based routing and protected layouts ensure only authorized users access specific dashboards.

---

## Core Features

### Admin Features

* Register new field agents with avatar upload
* Activate / deactivate agents (soft delete)
* Change field agent password
* View today overview (active / completed / absent)
* Generate monthly reports
* View daily attendance with working duration and location tracking

### Field Agent Features

* Secure cookie-based authentication
* Daily check-in & check-out
* Image upload during attendance
* Today status dashboard
* Monthly attendance grid

---

## Authentication & Security

Authentication uses **Access Tokens + Refresh Tokens** stored securely in cookies.

### Flow

1. User logs in → backend generates tokens
2. Cookies are automatically sent with requests
3. Axios interceptor refreshes expired access tokens
4. Logout clears cookies and invalidates tokens

Additional Security:

* Password hashing with bcrypt
* Token versioning for forced logout
* Role-based access control
* Input validation and sanitization handled inside controllers
* Centralized error handling middleware

---

## Architecture Overview

### Backend Structure

* **routes** → API endpoints
* **controllers** → business logic
* **models** → MongoDB schemas
* **middlewares** → auth, uploads, error handling
* **utils** → reusable helpers

Server boot flow:

* `index.js` → initializes server and database
* `app.js` → registers middleware and routes

The system is designed for scalability and supports future additions like Redis caching, Docker deployment, or microservices.

### Frontend Structure

* AuthContext manages authentication state globally
* ProtectedRoute enforces role-based access
* AppLayout provides shared UI (header + sidebar)
* Pages separated into admin and fieldagent modules

---

## API Overview

**Base URL**

```
/api/v1
```

### Main Modules

* User → authentication, avatar management, session handling
* Admin → field agent management & reports
* Attendance → check-in / check-out tracking

Example Actions:

* User login
* Register field agent
* Toggle agent active status
* Check-in with image and location
* Fetch monthly attendance

---

## API Documentation

### Swagger Documentation

Swagger UI is included for structured API exploration.

### Postman Collection

Complete API requests with payload examples and responses:

https://qureshiayaan36-869324.postman.co/workspace/Ayaan-Qureshi's-Workspace~e2c65373-3669-4675-87ad-c0c1362a45c8/collection/48587600-aefcdad6-d379-4056-81c0-035ef9d1de8b?action=share&creator=48587600

Includes:

* Authentication flow
* Admin APIs
* Attendance APIs
* Example request/response structures

---

## Mobile App

A basic Android APK is included.

The mobile version is built using Capacitor and connects directly to the same backend APIs for attendance actions.

---

## Setup

### Backend

```
cd Backend
npm install
npm run dev
```

### Frontend

```
cd Frontend
npm install
npm run dev
```

---

## Summary

PrimeTradeAi is a modular role-based attendance system designed with scalability and security in mind.

Admins manage field agents and monitor attendance with location and media proof.
Field agents perform daily attendance actions through a secure dashboard or mobile app.

The project demonstrates:

* REST API design
* JWT authentication
* Role-based access
* Scalable backend structure
* Frontend integration
* Deployment-ready architecture
