// Authentication - signup new user

const { firebase, db } = require('../admin');
const { isEmptyObj, validateSignup } = require('../lib');

exports.signup = (req, res) => {
	// Create user object and append creation date
	const user = {
		...req.body,
		created: new Date() /*.toISOString()*/
	};
	//require('../lib').logObj(user);

	// Validate signup data
	const err = validateSignup(user);
	if (!isEmptyObj(err)) return res.status(400).json(err);

	// Create new user and get his token
	let tokenId, userId;
	db.collection('users')
		.doc(user.username)
		.get()
		.then(username => {
			if (username.exists) return res.status(400).json({ username: 'Username already taken.' });

			// Create new user
			return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
		})
		.then(data => {
			userId = data.user.uid;
			return data.user.getIdToken();
		})
		.then(token => {
			tokenId = token;
			delete user.confirmPassword;
			return db
				.collection('users')
				.doc(user.username)
				.set({ ...user, userId });
		})
		.then(_ => {
			delete user.password;
			delete user.confirmPassword;
			return res.status(201).json({ tokenId, user });
		})
		.catch(err => {
			if (err.code === 'auth/email-already-in-use')
				return res.status(400).json({ error: 'Already in use' });

			if (err.code === 'auth/weak-password')
				return res.status(400).json({ error: 'Weak password' });

			console.log('TCL: exports.signup -> err', err);
			return res.status(500).json({ error: err.code });
		});
};
