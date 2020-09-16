// models/users.js
const mysqlPool = require('../lib/mysqlPool');
const bcrypt = require('bcryptjs');

const UserSchema = {
    name: {required: true},
    email: {required: true},
    password: {required: true}
};
exports.UserSchema = UserSchema;

const UserLoginSchema = {
    email: {required: true},
    password: {required: true}
};
exports.UserLoginSchema = UserLoginSchema;

async function insertNewUser(user) {
    user.password = await bcrypt.hash(
        user.password,
        10
    );

    const [ results ] = await mysqlPool.query(
        'INSERT INTO users SET ?',
        user 
    ); 

    return results.insertId 
}
exports.insertNewUser = insertNewUser;

async function getUserByEmail(email) {
    const [ results ] = await mysqlPool.query(
        'SELECT * FROM users WHERE email=?',
        [email]
    );

    return results[0];
}

async function validateUser(body) {
    const user = await getUserByEmail(body.email);
    const verifiedUser = await bcrypt.compare(body.password, user.password);
  
    return {
        userId: user.userId,
        name: user.name,
        verified: verifiedUser
    };
}
exports.validateUser = validateUser;

async function getUserById(userId){
    const [ results ] = await mysqlPool.query(
        'SELECT * FROM users WHERE userId=?',
        [userId]
    );

    return results[0];
}
exports.getUserById = getUserById;