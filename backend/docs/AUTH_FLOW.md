# Authentication Flow

User sends email and password to login endpoint.
Server validates credentials and generates access and refresh tokens.
Tokens are stored in cookies.

Frontend sends requests with cookies automatically.

If access token expires the frontend interceptor calls refreshAccessToken.
Server verifies refresh token and issues new tokens.

Logout clears tokens from cookies and database.

Token versioning ensures old tokens become invalid after new login.
