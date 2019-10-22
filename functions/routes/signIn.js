// Authentication - signin

const { firebase } = require('../admin');
const { isEmptyObj, validateSignIn } = require('../lib');

exports.signIn = (req, res) => {
	// Create user object
	const user = { ...req.body };

	// console.log('TCL: exports.signIn -> req.body', JSON.stringify(req.body, null, 2));

	// Validate user object
	const err = validateSignIn(user);
	if (!isEmptyObj(err)) return res.status(400).json(err);

	// Validate username and get it's token
	firebase
		.auth()
		.signInWithEmailAndPassword(user.email, user.password)
		.then(data => data.user.getIdToken())
		.then(token => res.json({ token }))
		.catch(err => {
			if (err.code === 'auth/user-not-found')
				return res.status(403).json({ login: 'User not found.' });

			if (err.code === 'auth/wrong-password')
				return res.status(403).json({ login: 'Wrong password.' });

			return res.status(500).json({ error: err.code });
		});
};
