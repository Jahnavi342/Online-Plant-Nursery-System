
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            
            if (!token) {
                return res.status(401).json({ 
                    message: 'Not authorized, no token provided',
                    error: 'MISSING_TOKEN'
                });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            if (!decoded || !decoded.id) {
                return res.status(401).json({ 
                    message: 'Not authorized, invalid token format',
                    error: 'INVALID_TOKEN_FORMAT'
                });
            }

            const user = await User.findById(decoded.id).select('-password');
            
            if (!user) {
                return res.status(401).json({ 
                    message: 'Not authorized, user not found',
                    error: 'USER_NOT_FOUND'
                });
            }

            req.user = user;
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ 
                    message: 'Not authorized, token expired',
                    error: 'TOKEN_EXPIRED'
                });
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ 
                    message: 'Not authorized, invalid token',
                    error: 'INVALID_TOKEN'
                });
            } else {
                console.error('Auth middleware error:', error);
                return res.status(401).json({ 
                    message: 'Not authorized, token verification failed',
                    error: 'TOKEN_VERIFICATION_FAILED'
                });
            }
        }
    } else {
        return res.status(401).json({ 
            message: 'Not authorized, no token provided',
            error: 'NO_AUTHORIZATION_HEADER'
        });
    }
};

module.exports = { protect };
