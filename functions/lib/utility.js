// Utility

const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Check if value is empty
exports.isEmptyStr = str => str.trim() === '';

// Check if object is empty
exports.isEmptyObj = object => !Object.keys(object).length;

// Check if valu is a valid email address
exports.isEmail = value => !value.match(emailRegEx);

// Router middleware for handlinkg async errors
exports.asyncWrapper = fn => {
	(req, res, next = console.error) => Promise.resolve(fn(req, res, next)).catch(next);
};

exports.logObj = object => console.log('TCL: object', JSON.stringify(object, null, 2));
