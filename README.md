# Event Booking API

This project implements an event booking API built with Golang and the Gin web framework. It also uses SQLite for data persistence and JWT for authentication.

## Tech Stack

- **Golang** (Go 1.24.0)
- **Gin Framework** for API routing
- **SQLite** as the database engine
- **JWT** for authentication
- **bcrypt** for password hashing

## Features

- User signup and login with JWT authentication.
- Create, update, delete, and fetch events.
- Register and cancel event registrations.
- RESTful API design.
- SQL database integration with SQLite.

## Project Structure

- `/models` - Contains data models for users and events.
- `/routes` - API routes and handlers for events and user authentication.
- `/middlewares` - Contains authentication middleware.
- `/db` - Database initialization and table creation.
- `/utils` - Helper functions (JWT generation/verification, password hashing).

## API Endpoints

- **User Authentication**
  - POST `/signup` - Create a new user.
  - POST `/login` - Authenticate a user and generate a token.
- **Events**
  - GET `/events` - Retrieve all events.
  - GET `/events/:id` - Retrieve an event by ID.
  - POST `/events` - Create a new event (requires authentication).
  - PUT `/events/:id` - Update an event (requires authentication; event creator only).
  - DELETE `/events/:id` - Delete an event (requires authentication; event creator only).
- **Event Registration**
  - POST `/events/:id/register` - Register for an event (requires authentication).
  - DELETE `/events/:id/register` - Cancel an event registration (requires authentication).

## Setup & Installation

1. Clone the repository.
2. Install dependencies using Go modules.
3. Run the application:
   ```
   go run main.go
   ```
4. Use the HTTP test files in `/api-test` to test endpoints.

## Testing the API

- Use tools like [Postman](https://www.postman.com) or HTTP client extensions in your code editor.
- Example test files for various endpoints are provided under `/api-test`.

## License

This project is open source. Feel free to modify and use it as needed.

## Contribution

Contributions are welcome! Please open an issue or submit a pull request for any improvements.

---

Happy Coding!
