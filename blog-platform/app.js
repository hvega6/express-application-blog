const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const jsonParser = require('./middlewares/jsonParser');

const app = express();

// Connect to SQLite database
const db = new sqlite3.Database('./blog.db', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Middleware
app.use(logger); // Logging middleware
app.use(jsonParser); // JSON parsing middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Create tables if they don't exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        author INTEGER,
        FOREIGN KEY (author) REFERENCES users (id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        postId INTEGER,
        content TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (postId) REFERENCES posts (id)
    )`);
});

// Routes
app.get('/', (req, res) => {
    // Render the homepage (you can fetch posts from the database here)
    res.render('index', { posts: [] }); // Replace with actual posts data
});

app.use('/users', require('./routes/users')(db)); // Ensure this is correct
app.use('/posts', require('./routes/posts')(db)); // Ensure this is correct
app.use('/comments', require('./routes/comments')(db)); // Ensure this is correct

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
