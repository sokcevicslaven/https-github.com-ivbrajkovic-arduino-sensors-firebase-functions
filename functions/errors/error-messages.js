/**
 * Error messages
 */

module.exports = {
  // Inavlid form inputs
  DATA_REQUEST_INVALID: {
    code: 'data_request_invalid',
    message: 'Invalid data request from user input',
    statusCode: 422
  },

  // User related
  USER_EXIST: {
    code: 'user_exist',
    message: 'User exist',
    statusCode: 400,
    details: [
      {
        msg: 'User exist',
        param: 'email'
      }
    ]
  },
  USER_USERNAME_ALREADY_TAKEN: {
    code: 'user_username_already_taken',
    message: 'Username already taken',
    statusCode: 400,
    details: [
      {
        msg: 'Username already taken',
        param: 'username'
      }
    ]
  },
  USER_NOT_EXIST: {
    code: 'user_not_exist',
    message: 'User does not exist',
    statusCode: 404,
    details: [
      {
        msg: 'User does not exist',
        param: 'email'
      }
    ]
  },
  USER_PASSWORD_WEAK: {
    code: 'user_password_weak',
    message: 'Weak password',
    statusCode: 400,
    details: [
      {
        msg: 'Weak password',
        param: 'password'
      }
    ]
  },
  USER_PASSWORD_NOT_MATCH: {
    code: 'user_password_not_match',
    message: 'User password not match',
    statusCode: 400,
    details: [
      {
        msg: 'User password not match',
        param: 'password'
      }
    ]
  },

  // Token related
  JWT_TOKEN_NOT_FOUND: {
    code: 'jwt_token_not_found',
    message: 'JWT token not found on the authorization header',
    statusCode: 401
  },
  JWT_TOKEN_INVALID: {
    code: 'jwt_token_invalid',
    message: 'Invalid JWT token',
    statusCode: 401
  },
  JWT_TOKEN_EXPIRED: {
    code: 'jwt_token_expired',
    message: 'JWT token expired',
    statusCode: 401
  },
  JWT_UNKNOWN: {
    code: 'jwt_unknown',
    message: 'JWT unknown error',
    statusCode: 401
  },
  JWT_TIMEOUT: {
    code: 'jwt_timeout',
    message: 'JWT Authentication timeout error',
    statusCode: 401
  },

  // Not found
  PAGE_NOT_FOUND: {
    code: 'page_not_found',
    message: 'Page not found',
    statusCode: 404
  },

  // Inavlid form inputs
  DB_DOCUMENT_NOT_FOUND: {
    code: 'db_document_not_found',
    message: 'Recquested document not found',
    statusCode: 404
  }
};
