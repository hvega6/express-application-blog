const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const authMiddleware = require('../middlewares/authMiddleware');
const { createPost, editPost, deletePost } = require('../controllers/postController');

// Create post route (protected)
router.post('/', authMiddleware, createPost);

// Edit post route (protected)
router.put('/:id', authMiddleware, editPost);

// Delete post route (protected)
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
