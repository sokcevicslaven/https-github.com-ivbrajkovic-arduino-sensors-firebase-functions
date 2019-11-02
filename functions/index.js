// Firebase functions
const functions = require('firebase-functions');

// Express application
const app = require('express')();

const { auth } = require('./middlewares');

// Data routes
app.get('/data', auth, require('./routes').getAllSensorData);
app.get('/data-top', auth, require('./routes').getSensorDataTop10);
app.post('/data-range', auth, require('./routes').getSensorDataInRange);
app.post('/data' /*, auth */, require('./routes').createSensorData);

// User routes
app.post('/login', require('./routes').login);
app.post('/signup', require('./routes').signup);
app.get('/username/:username', require('./routes').checkUsername);
app.get('/user/:id', auth, require('./routes').getUserDetailsById);

exports.api = functions.region('europe-west1').https.onRequest(app);
