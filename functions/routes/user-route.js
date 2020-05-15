/**
 * User router module
 */

// Express router
const router = require('express').Router();

// Private route middleware
const privateRoute = require('./middlewares/private-route');

// Validators
const { user: userValidator, validate } = require('./validators');

// User controller
const { user: userController } = require('./controllers');

/***********************************************
 * PUBLIC ROUTES
 ***********************************************/

// Login user route
router.post('/login', validate(userValidator.login), userController.login);

// Register new user route
router.post(
  '/register',
  validate(userValidator.register),
  userController.register
);

/***********************************************
 * PRIVATE ROUTES
 ***********************************************/

// Get user by email
router.get(
  '/:email',
  privateRoute,
  validate(userValidator.getUserByEmail),
  userController.getUserByEmail
);

// Export router
module.exports = router;
