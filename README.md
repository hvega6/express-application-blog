# Blog Platform

This is a simple blog platform built using Node.js, Express, and EJS as the view engine. It follows RESTful principles and includes CRUD operations for Users, Posts, and Comments.

## Setup

1. Clone this repository.
2. Install dependencies: `npm install`
3. Start the server: `npm start`

## Features

### Users
- GET /users: List all users.
- GET /users/:id: Get a single user by ID.
- POST /users: Create a new user (name and email required).
- PUT /users/:id: Update an existing user.
- DELETE /users/:id: Delete a user.

### Posts
- GET /posts: List all posts with optional query parameters for filtering by user ID or title.
- GET /posts/:id: Get a single post by ID.
- POST /posts: Create a new post (title, content, and userId required).
- PUT /posts/:id: Update an existing post.
- DELETE /posts/:id: Delete a post.

### Comments
- GET /posts/:postId/comments: List all comments for a specific post.
- POST /posts/:postId/comments: Create a new comment (author and content required).

## Middleware

- jsonParser: Parses incoming request bodies as JSON.
- logger: Logs the HTTP method, URL, and response status code.
- errorHandler: Centralized error handling middleware.

## Views

- index.ejs: Displays a list of posts with pagination.
- post.ejs: Displays detailed information about a single post and its comments. Includes forms for adding new comments.
- user.ejs: Displays a list of users.

## Code Management

- Follows the MVC (Model-View-Controller) pattern.
- Uses separate files for routes (routes/) and middleware (middlewares/).
- Includes a .gitignore file to exclude node_modules and package-lock.json from version control.

## Error Handling

- Centralized error handling middleware (middlewares/errorHandler.js).
- Custom error responses with appropriate status codes and messages.
