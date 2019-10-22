// Firebase functions
const functions = require('firebase-functions');

// Express application
const app = require('express')();

// Data routes
app.get('/data', require('./routes').getData);
app.post('/data', require('./routes').postData);

// Authentication routes
app.post('/signup', require('./routes').signUp);
app.post('/login', require('./routes').signIn);

exports.api = functions.region('europe-west1').https.onRequest(app);
