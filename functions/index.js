// Firebase functions
const functions = require('firebase-functions');

// Express application
const app = require('express')();

const { auth } = require('./middlewares');

// Data routes
app.get('/data', auth, require('./routes').getData);
app.post('/data', auth, require('./routes').postData);

// Authentication routes
app.post('/signup', require('./routes').signUp);
app.post('/login', require('./routes').signIn);

exports.api = functions.region('europe-west1').https.onRequest(app);
