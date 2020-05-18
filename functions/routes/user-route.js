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

router.get(
  '/username/:username',
  // privateRoute,
  validate(userValidator.getUserByUsername),
  userController.checkUserByUsernameOrEmail
);

// Get user by email
router.get(
  '/email/:email',
  // privateRoute,
  validate(userValidator.getUserByEmail),
  userController.checkUserByUsernameOrEmail
);

/***********************************************
 * PRIVATE ROUTES
 ***********************************************/

// Export router
module.exports = router;
