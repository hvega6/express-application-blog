const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    const { title, content } = req.body;
    const post = new Post({ title, content, author: req.user._id }); // Assuming req.user is set after authentication

    try {
        await post.save();
        res.status(201).send('Post created successfully');
    } catch (error) {
        res.status(400).send('Error creating post');
    }
};

exports.editPost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        await Post.findByIdAndUpdate(id, { title, content });
        res.send('Post updated successfully');
    } catch (error) {
        res.status(400).send('Error updating post');
    }
};

exports.deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        await Post.findByIdAndDelete(id);
        res.send('Post deleted successfully');
    } catch (error) {
        res.status(400).send('Error deleting post');
    }
};

