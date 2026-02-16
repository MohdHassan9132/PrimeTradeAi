# Attendance System Frontend

Attendance system frontend is a React application used to interact with the backend attendance system.

It provides dashboards for admin users and field agents with role based navigation and protected routing.

## Tech Stack

React
React Router
Axios
Context API
Vite

## Core Features

Login and authentication
Protected routes based on user roles
Admin dashboard for managing agents
Field agent attendance pages
Avatar upload

## Routing Structure

Public routes include landing page and login.
Protected routes are wrapped by ProtectedRoute and AppLayout.

## Authentication Strategy

AuthContext manages user state globally.
Axios interceptor refreshes expired tokens automatically.
Cookies are used instead of local storage for security.

## Setup

npm install
npm run dev

## Folder Structure

api contains API handlers
context manages authentication state
layout defines sidebar and header
pages contain admin and field agent views
routes include protected route wrapper
