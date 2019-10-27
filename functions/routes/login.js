// Authentication - signin

const { firebase } = require('../admin');
const { isEmptyObj, validateLogin } = require('../lib');

exports.login = (req, res) => {
	// Create user object
	const user = { ...req.body };
	//require('../lib').logObj(user);

	// Validate user object
	const err = validateLogin(user);
	if (!isEmptyObj(err)) return res.status(400).json(err);

	// Validate username and get it's token
	firebase
		.auth()
		.signInWithEmailAndPassword(user.email, user.password)
		.then(data => data.user.getIdToken())
		.then(token => res.json({ token }))
		.catch(err => {
			if (err.code === 'auth/user-not-found')
				return res.status(403).json({ error: 'User not found.' });

			if (err.code === 'auth/wrong-password')
				return res.status(403).json({ error: 'Wrong password.' });

			return res.status(500).json({ error: err.code });
		});
};
