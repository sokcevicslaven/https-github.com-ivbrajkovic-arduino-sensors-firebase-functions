// Authentication middleware

const { admin, db } = require('../admin');

exports.auth = (req, res, next) => {
	// Return error if there is no auth header info
	let token = req.headers.token;
	if (!token || !token.startsWith('Bearer ')) res.status(403).json({ error: 'Not authorized.' });

	//require('../lib').logObj(token);

	// Verify token
	token = token.split('Bearer ')[1];
	admin
		.auth()
		.verifyIdToken(token)
		.then(user => {
			req.user = user;
			return db
				.collection('users')
				.where('userId', '==', req.user.uid)
				.limit(1)
				.get();
		})
		.then(data => {
			req.user.username = data.docs[0].data().username;

			// Proceed with request
			return next();
		})
		.catch(err => res.status(403).json(err));
};
