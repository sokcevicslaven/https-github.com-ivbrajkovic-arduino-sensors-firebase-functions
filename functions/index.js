/**
 * Express application module
 */

// Firebase functions
const functions = require('firebase-functions');

// Express application
const app = require('express')();

// Error module
const { errorMessages, ErrorHandler } = require('./errors');

// Enable CORS
app.use(require('cors')({ origin: true }));

// Routes
app.use('/user', require('./routes/user-route'));
app.use('/data', require('./routes/data-route'));
app.use('/settings', require('./routes/settings-route'));

// Catch 404 and forward to error handler
app.use((req, res, next) =>
  next(new ErrorHandler(errorMessages.PAGE_NOT_FOUND))
);

// Deafult error handler
app.use((err, req, res, next) => {
  if (err instanceof ErrorHandler) ErrorHandler.handlerError(err, res);
  else ErrorHandler.handlerError(new ErrorHandler(err), res);
});

// Export firstore functions
exports.api = functions.region('europe-west1').https.onRequest(app);
