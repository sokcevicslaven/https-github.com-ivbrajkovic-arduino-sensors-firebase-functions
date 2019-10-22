// Authentication - signup

const db = require('../admin').db;
const firebase = require('../admin').firebase;
const isEmptyObj = require('../lib').isEmptyObj;
const validateSignUp = require('../lib').validateSignUp;

exports.signUp = (req, res) => {
	// Create user object and append date created
	const user = { ...req.body, created: new Date().toISOString() };

	// console.log('TCL: exports.signUp -> req.body', JSON.stringify(req.body, null, 2));

	// Validate user object
	const error = validateSignUp(user);
	if (!isEmptyObj(error)) return res.status(400).json({ error: error });

	// Validate username, create new user and get the user token
	let tokenId, userId;
	db.collection('users')
		.doc(user.username)
		.get()
		.then(username => {
			if (username.exists) return res.status(400).json({ username: 'Already taken.' });

			// Create new user
			return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
		})
		.then(data => {
			userId = data.user.uid;
			return data.user.getIdToken();
		})
		.then(token => {
			tokenId = token;
			return db
				.collection('users')
				.doc(user.username)
				.set({ ...user, userId });
		})
		.then(_ => res.status(201).json({ tokenId }))
		.catch(err => {
			if (err.code === 'auth/email-already-in-use')
				return res.status(400).json({ email: 'Already in use.' });
			res.status(500).json({ error: err.code });
		});
};
