// auth.js

const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'hunter2'; 
const { getUserById } = require('../models/users');

function generateAuthToken (userId) {
    const payload = { sub: userId };
    return jwt.sign(payload, secretKey, {expiresIn: '24h'});
}
exports.generateAuthToken = generateAuthToken;

async function requireAuthentication(req, res, next){
    /* This function will be called with every middleware function */

    const authHeader = req.get('Authorization') || '';
    const authHeaderParts = authHeader.split(' ');
    const token = authHeaderParts[0] === 'Bearer' ? authHeaderParts[1] : null;
    
    try {
        const user = await getUserById(req.params.id);
        const payload = jwt.verify(token, secretKey);
        req.user = payload.sub;
        req.name = user;
        if(req.user && req.name){
            req.authenticated = true;
            console.log(" == Authenticated Action");
        } else {
            req.authenticated = false;
            console.log(" == Unauthenticated Action");
        }
    } catch (err) {
        console.log(" == Unauthenticated Action", err);
        req.authenticated = false;
    }
    next();
}
exports.requireAuthentication = requireAuthentication;