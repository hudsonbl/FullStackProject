// index.js
// Router enables variable HTTP Paths to be mapped per request. Ex: GET /home and distinctly call respective POST /home
const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/work-orders', require('./workOrders')); // Added line

module.exports = router;