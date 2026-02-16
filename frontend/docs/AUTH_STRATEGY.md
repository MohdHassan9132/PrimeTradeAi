# Frontend Authentication Strategy

Authentication is handled using cookies instead of local storage.

Axios interceptor listens for token expiry responses and triggers refreshAccessToken automatically.

Requests made during token refresh are queued to prevent multiple refresh calls.

If refresh fails the user is redirected to login.
