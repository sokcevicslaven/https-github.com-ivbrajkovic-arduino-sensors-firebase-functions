/**
 * Authentication middleware
 */

const { admin } = require('../../admin');
const { errorMessages, ErrorHandler } = require('../../errors');

module.exports = (req, res, next) => {
  // Get auth header
  let authHeader = req.headers['authorization'];
  if (!authHeader)
    return next(new ErrorHandler(errorMessages.JWT_TOKEN_NOT_FOUND));

  // Vreify auth header
  if (!authHeader.startsWith('Bearer '))
    return next(new ErrorHandler(errorMessages.JWT_TOKEN_INVALID));

  // Get token from header
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return next(new ErrorHandler(errorMessages.JWT_TOKEN_NOT_FOUND));

  // Verify token
  admin
    .auth()
    .verifyIdToken(token)
    .then(user => {
      // Save decoded user
      req.user = user;
      // Call next middleware
      next();
    })
    .catch(err => next(new ErrorHandler(errorMessages.JWT_TOKEN_INVALID)));
};
