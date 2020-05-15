/**
 * Validators
 */

// Express validator middleware
const { param, body } = require('express-validator');

/**************************************************************
 * Check email
 **************************************************************/
exports.checkEmail = obj =>
  obj
    .notEmpty()
    .bail()
    .withMessage('Email must not be empty')
    .trim()
    .isEmail()
    .withMessage('Email is invalid')
    .bail()
    .customSanitizer(value => value.toLowerCase());
/**************************************************************/

/**************************************************************
 * Check text field
 **************************************************************/
exports.checkTextField = obj =>
  obj
    .notEmpty()
    .withMessage('Field must not be empty')
    .bail()
    .trim()
    .isString()
    .withMessage('Field must be a string')
    .bail()
    .isLength({ min: 4, max: 20 })
    .withMessage('Field lenght is invalid')
    .bail()
    .customSanitizer(value => value.toLowerCase());
/**************************************************************/

/**************************************************************
 * Check password field
 **************************************************************/
exports.checkPassword = body('password')
  .notEmpty()
  .withMessage('Password must not be empty')
  .bail()
  .isString()
  .withMessage('Field must be a string')
  .bail()
  .isLength({ min: 4, max: 20 })
  .withMessage('Password length is invalid');
/**************************************************************

/**************************************************************
 * Check confirm password field
 **************************************************************/
exports.checkCnfirmPassword = body('confirmPassword')
  .notEmpty()
  .withMessage('Password confirmation must not be empty')
  .bail()
  .isLength({ min: 4, max: 20 })
  .withMessage('Password confirmation length is invalid')
  .bail()
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  });
/**************************************************************/

/**************************************************************
 * Check number field
 **************************************************************/
exports.checkNumber = object =>
  object
    .notEmpty()
    .withMessage('Field must not be empty')
    .bail()
    .isNumeric({ no_symbols: true })
    .withMessage('Field must contain only number');
/**************************************************************/

/**************************************************************
 * Check date field (YYYY-MM-DD)
 **************************************************************/
exports.checkDate = object =>
  object
    .notEmpty()
    .withMessage('Field must not be empty')
    .bail()
    .custom(value => {
      // if (!value.match(/^\d{2}\/\d{2}\/\d{4}$/))
      if (
        !value.match(
          // /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/
          /^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/
        )
      )
        throw new Error('Invalid date format');
      return true;
    });
/**************************************************************/
