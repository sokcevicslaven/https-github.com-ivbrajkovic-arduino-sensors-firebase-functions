/**
 * Data validator
 */

// Express validator middleware
const { body, param } = require('express-validator');

// Validators
const { checkNumber, checkDate } = require('./validate-rules');

module.exports = {
  // Check number of row param
  selectAll: [param('n').customSanitizer(() => 0)],

  // Check number of row param
  selectLastN: [checkNumber(param('n'))],

  // Check from and to req fileds
  fromTo: [checkDate(body('from')), checkDate(body('to'))],

  // Check value to insert
  insert: [
    checkNumber(body('arduino')),
    checkNumber(body('co2')),
    checkNumber(body('humidity')),
    checkNumber(body('temperature'))
  ]
};
