const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    try {
        const token = req.headers['access-token'];
        if (!token) {
            return next({
                status: 401,
                name: 'TokenError',
                message: 'No token provided'
            })
        } 
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY, { algorithm: 'HS512' });
        req.user = verifyToken;
        next();
    } catch (error) {
        next({
            status: 498,
            name: 'TokenExpiredError',
            message: error
        })
    }
}

module.exports = auth;