// users.js

const router = require('express').Router();
const { validateAgainstSchema, extractValidFields } = require('../lib/validation');
const { generateAuthToken } = require('../lib/auth');
const { 
    insertNewUser,
    validateUser,
    UserSchema,
    UserLoginSchema
} = require('../models/users');

// PATH: localhost:5000/users
router.post('/', async(req, res) => {
    // Parses JSON keys in request body
    const body = extractValidFields(req.body, UserSchema);
    // Ensure body contains proper keys for db transaction
    if(validateAgainstSchema(body, UserSchema)) {
        try {
            await insertNewUser(body);
            res.status(200).send({
                successMessage: 'User was created successfully',
                successStatus: true 
            });
        } catch (err) {
            res.status(403).send({
                errorMessage: 'Error posting user to server',
                successStatus: false 
            });
        }
    } else {
        res.status(400).send({
            errorMessage: 'Request body contained invalid fields',
            successStatus: false
        });
    }
});

// PATH: localhost:5000/users/login
router.post('/login', async(req, res) => {
    const body = extractValidFields(req.body, UserLoginSchema);
    // Ensure body contains proper keys for db transaction
    if(validateAgainstSchema(body, UserLoginSchema)) {
        try {
            const authenticated = await validateUser(body);
            if(authenticated.verified) {
                const token = generateAuthToken(authenticated.userId);

                res.status(200).send({
                    bearerToken: token,
                    userId: authenticated.userId,
                    successStatus: true 
                });
            } else {
                res.status(401).send({
                    errorMessage: "Login either contained invalid email or password",
                    successStatus: false
                });
            }
        } catch (err) {
            res.status(403).send({
                errorMessage: 'Error posting user to server',
                successStatus: false 
            });
        }
    } else {
        res.status(400).send({
            errorMessage: 'Request body contained invalid fields',
            successStatus: false
        });
    }
});

module.exports = router;