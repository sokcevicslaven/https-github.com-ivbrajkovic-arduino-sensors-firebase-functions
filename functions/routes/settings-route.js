/**
 * Settings router module
 */

// Express router
const router = require('express').Router();

// Private route middleware
const privateRoute = require('./middlewares/private-route');

// Validators
const { settings: settingsValidator, validate } = require('./validators');

// Settings controller
const { settings: settingsController } = require('./controllers');

// Set all settings route as private
router.use(privateRoute);

// Get all arduinos settings
router.get('/', settingsController.select);

// Get arduino settings by id
router.get(
  '/:id',
  validate(settingsValidator.selectId),
  settingsController.selectId
);

// Export router
module.exports = router;
