const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Add comment route
router.post('/:postId', async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
    // Save comment to database
});

// Delete comment route
router.delete('/:commentId', async (req, res) => {
    const { commentId } = req.params;
    // Delete comment from database
});

module.exports = router;

