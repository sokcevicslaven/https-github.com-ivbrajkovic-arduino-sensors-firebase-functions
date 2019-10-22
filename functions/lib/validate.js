// Validate signup and signin data

const { isEmail, isEmptyStr } = require('./utility');

exports.validateSignUp = data => {
	// Error object
	let err = {};

	// Check username
	if (isEmptyStr(data.username)) err.username = 'Field is required.';

	// Check firstname and lastname
	if (isEmptyStr(data.firstName)) err.firstName = 'Field is required.';
	if (isEmptyStr(data.lastName)) err.lastName = 'Field is required.';

	// Check email
	if (isEmptyStr(data.email)) err.email = 'Field is required.';
	else if (isEmail(data.email)) err.email = 'Email is not valid.';

	// Check password
	if (isEmptyStr(data.password)) err.password = 'Field is required.';
	if (data.password !== data.confirmPassword) err.password = 'Passwords do not match.';

	// If empty than no errors
	return err;
};

exports.validateSignIn = data => {
	// Error object
	let err = {};

	// Check email
	if (isEmptyStr(data.email)) err.email = 'Field is required.';
	else if (isEmail(data.email)) err.email = 'Email is not valid.';

	// Check password
	if (isEmptyStr(data.password)) err.password = 'Field is required.';

	// If empty than no errors
	return err;
};
