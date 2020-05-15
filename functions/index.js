/**
 * Express application module
 */

// Firebase functions
const functions = require('firebase-functions');

// Express application
const app = require('express')();

// Error module
const { errorMessages, ErrorHandler } = require('./errors');

// Async wrapper
// const { asyncWrapper } = require('./routes/utils');

// Auth middleware
// const { auth } = require('./middlewares');

// Data routes
// app.get('/data', auth, require('./routes').getAllSensorData);
// app.get('/data-top', auth, require('./routes').getSensorDataTop10);
// app.post('/data-range', auth, require('./routes').getSensorDataInRange);
// app.post('/data' /*, auth */, require('./routes').createSensorData);

// // User routes
// app.post('/login', require('./routes/login').login);
// app.post('/signup', require('./routes').signup);
// app.get('/username/:username', require('./routes').checkUsername);
// app.get('/user/:id', auth, require('./routes').getUserDetailsById);

app.use('/user', require('./routes/user-route'));
app.use('/settings', require('./routes/settings-route'));

// Catch 404 and forward to error handler
app.use((req, res, next) =>
  next(new ErrorHandler(errorMessages.PAGE_NOT_FOUND))
);

// Deafult error handler
app.use((err, req, res, next) => {
  ErrorHandler.handlerError(new ErrorHandler(err), res);
});

exports.api = functions.region('europe-west1').https.onRequest(app);
