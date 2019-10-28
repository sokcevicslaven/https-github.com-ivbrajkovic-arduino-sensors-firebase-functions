// Authentication - signin

const { firebase, db } = require('../admin');
const { isEmptyObj, validateLogin } = require('../lib');

exports.login = (req, res) => {
	// Create user object
	const user = { ...req.body };
	//require('../lib').logObj(user);

	// Validate user object
	const err = validateLogin(user);
	if (!isEmptyObj(err)) return res.status(400).json(err);

	// Validate username and get it's token
	let userId, tokenId;
	firebase
		.auth()
		.signInWithEmailAndPassword(user.email, user.password)
		.then(data => {
			userId = data.user.uid;
			return data.user.getIdToken();
		})
		.then(token => {
			tokenId = token;
			return db
				.collection('users')
				.where('userId', '==', userId)
				.limit(1)
				.get();
			// res.json({ token });
		})
		.then(snapshot => {
			if (snapshot.empty) return res.status(200).json({ tokenId });

			const user = snapshot.docs[0].data();
			delete user.password;
			delete user.confirmPassword;
			return res.json({ tokenId, user });
		})
		.catch(err => {
			if (err.code === 'auth/user-not-found')
				return res.status(403).json({ error: 'User not found.' });

			if (err.code === 'auth/wrong-password')
				return res.status(403).json({ error: 'Wrong password.' });

			return res.status(500).json({ error: err.toString() });
		});
};
