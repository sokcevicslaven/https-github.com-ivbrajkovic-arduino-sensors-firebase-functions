/**
 * Data router module
 */

const router = require('express').Router();
const { data: dataController } = require('./controllers');
const { data: dataValidator, validate } = require('./validators');
// const privateRoute = require('./middlewares/private-route');

// Set all data route as private
// router.use(privateRoute);

// Get all sensor data from database
router.get('/', validate(dataValidator.selectAll), dataController.select);

// Get lasts N sensor data from database
router.get(
  '/last/:n',
  validate(dataValidator.selectLastN),
  dataController.select
);

// Insert new data into database
router.post('/', validate(dataValidator.insert), dataController.insert);

// Export router
module.exports = router;
