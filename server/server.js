// server.js
const express = require('express'); // Webframework for HTTP requests
const morgan = require('morgan');   // HTTP request logger middleware function
const app = express();
const api = require('./api'); 
const cors = require('cors');
const port = process.env.PORT || 5000;
const {applyRateLimit} = require('./lib/redis'); 

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));

app.use(applyRateLimit); 
app.use('/', api);

app.use('*', (req, res, next) => {
    res.status(400).send({
        errorMessage: 'Endpoint was not found',
        successStatus: false
    });
});

app.listen(port, function() {
    console.log("== Server running on port: ", port);
});