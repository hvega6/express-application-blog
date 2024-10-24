const express = require('express');
const router = express.Router();
const { createPost, editPost, deletePost } = require('../controllers/postController'); // Ensure these are correctly defined
const authMiddleware = require('../middlewares/authMiddleware');

// Create post route (protected)
router.post('/', authMiddleware, createPost);

// Edit post route (protected)
router.put('/:id', authMiddleware, editPost);

// Delete post route (protected)
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
