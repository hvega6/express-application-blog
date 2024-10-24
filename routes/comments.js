const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/:postId/comments', commentController.getCommentsByPostId);
router.post('/:postId/comments', commentController.createComment);

module.exports = router;
