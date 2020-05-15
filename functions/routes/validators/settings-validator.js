/**
 * Settings validator
 */

// Express validator middleware
const { param, body } = require('express-validator');

// Validators
const { checkNumber } = require('./validate-rules');

module.exports = {
  // Get settings by arduino id
  selectId: [checkNumber(param('id'))],

  // Check fields required for insert or update
  insertOrUpdate: [
    checkNumber(body('arduino')),
    checkNumber(body('fan')),
    checkNumber(body('led')),
    checkNumber(body('updateInterval')),
    checkNumber(body('co2.min')),
    checkNumber(body('co2.max')),
    checkNumber(body('humidity.min')),
    checkNumber(body('humidity.max')),
    checkNumber(body('temperature.min')),
    checkNumber(body('temperature.max'))
  ]
};
