/**
 * Response helper
 * @param {*} res Response object
 * @param {*} code Status code
 * @param {*} data Response data
 */
exports.response = (res, code, data) => {
  res.status(code).json({
    status: code >= 200 && code < 300 ? 'ok' : 'error',
    data
  });
};

exports.sendOK = (res, data) => response(res, data.statusCode || 200, data);
exports.sendError = (res, data) => response(res, data.statusCode || 500, data);
