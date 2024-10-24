const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

module.exports = (db) => {
    // Registration route
    router.post('/register', async (req, res) => {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
            if (err) {
                return res.status(400).send('Error registering user');
            }
            res.status(201).send('User registered successfully');
        });
    });

    // Login route
    router.post('/login', (req, res) => {
        const { username, password } = req.body;
        
        db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
            if (err || !user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).send('Invalid credentials');
            }
            res.send('Login successful');
        });
    });

    return router; // Ensure you return the router
};
