const express = require('express');
const router = express.Router();
const { createPost, editPost, deletePost, getAllPosts } = require('../controllers/postController'); // Ensure these are correctly defined
const authMiddleware = require('../middlewares/authMiddleware');

// Create post route (protected)
router.post('/', authMiddleware, createPost);

// Edit post route (protected)
router.put('/:id', authMiddleware, editPost);

// Delete post route (protected)
router.delete('/:id', authMiddleware, deletePost);

// Get all posts route (protected)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const posts = await getAllPosts(); // Fetch all posts from the database
        res.json(posts); // Send the posts as a JSON response
    } catch (error) {
        res.status(500).send('Server error'); // Handle errors
    }
});

module.exports = function(db) {
    // Define your routes here
    router.get('/', (req, res) => {
        // Example route handler
        res.send(posts);
    });

    // More routes...
    

    return router;
};
