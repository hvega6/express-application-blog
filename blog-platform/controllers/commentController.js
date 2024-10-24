const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
    const comment = new Comment({ postId, content });

    try {
        await comment.save();
        res.status(201).send('Comment added successfully');
    } catch (error) {
        res.status(400).send('Error adding comment');
    }
};

exports.deleteComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        await Comment.findByIdAndDelete(commentId);
        res.send('Comment deleted successfully');
    } catch (error) {
        res.status(400).send('Error deleting comment');
    }
};

