const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret'; // Use the same secret as in userController

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
    
    if (!token) {
        return res.status(403).send('Token is required');
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token');
        }
        req.user = decoded; // Attach user info to request
        next();
    });
};

