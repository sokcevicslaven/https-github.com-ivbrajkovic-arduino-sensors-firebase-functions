/**
 * User validator
 */

// Express validator middleware
const { param, body } = require('express-validator');

// Validators
const {
  checkEmail,
  checkTextField,
  checkPassword,
  checkCnfirmPassword
} = require('./validate-rules');

module.exports = {
  // Login user validator
  login: [checkEmail(body('email')), checkPassword],

  // Register new user validator
  register: [
    checkEmail(body('email')),
    checkTextField(body('name')),
    checkTextField(body('lastname')),
    checkTextField(body('username')),
    checkPassword,
    checkCnfirmPassword
  ],

  // Delete user validator
  delete: [checkEmail(param('email'))],

  // Get user by email
  getUserByEmail: [checkEmail(param('email'))],

  // Get user by username
  getUserByUsername: [checkTextField(param('username'))]
};
