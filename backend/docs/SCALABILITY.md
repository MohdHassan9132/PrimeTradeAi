# Scalability Notes

The backend uses modular routing so new modules can be added without touching core logic.

JWT tokenVersion allows forced logout across sessions.

Media files are stored on Cloudinary instead of local storage which improves scalability.

Error handling middleware centralizes API responses.

The architecture supports future improvements like Redis caching, Docker deployment or microservices separation.
