const express = require('express');
const router = express.Router();

module.exports = function(db) {
    // Define your routes here
    router.get('/', (req, res) => {
        // Fetch all comments from the database
        db.collection('comments').find().toArray((err, comments) => {
            if (err) {
                return res.status(500).send(err); // Handle error
            }
            res.send(comments); // Send the retrieved comments
        });
    });

    // More routes...

    return router;
};
