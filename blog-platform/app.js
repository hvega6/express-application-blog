const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const jsonParser = require('./middlewares/jsonParser');

const app = express();

// Connect to MongoDB (make sure to replace the URI with your actual MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/blog-platform', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(logger); // Logging middleware
app.use(jsonParser); // JSON parsing middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    // Render the homepage (you can fetch posts from the database here)
    res.render('index', { posts: [] }); // Replace with actual posts data
});

app.use('/users', require('./routes/users')); // User routes
app.use('/posts', require('./routes/posts')); // Post routes
app.use('/comments', require('./routes/comments')); // Comment routes

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

