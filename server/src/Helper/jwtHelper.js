// jwt helper functions
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (payload) => {
    console.log(payload);
    
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    }

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

const decodeToken = (token) => {
    return jwt.decode(token, { complete: true });
}

module.exports = { generateToken, verifyToken, decodeToken };