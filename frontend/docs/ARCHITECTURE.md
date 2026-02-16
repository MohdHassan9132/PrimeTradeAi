# Frontend Architecture

The frontend uses a layout driven routing structure.

AuthProvider wraps the application and manages user session.

ProtectedRoute checks authentication and role permissions before rendering pages.

AppLayout contains shared UI elements like header and sidebar.

Pages are separated into admin and fieldagent directories for clarity.
