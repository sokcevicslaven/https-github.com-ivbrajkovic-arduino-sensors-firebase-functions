// User routes

const { firebase, db } = require('../admin');

// GET methods

/**
 * method: GET
 * Retreive retreive user detail by user id
 * @param req.params.id user id
 * @param res
 */
exports.getUserDetailsById = (req, res) => {
	// Validate id
	if (!req.params) return res.status(400).json({ error: 'Invalid user id' });

	// Get user id
	const userId = req.params.id;
	//require('../lib').logObj(req.params);

	// Get user details from firebase
	db.collection(`users`)
		.where('userId', '==', userId)
		.limit(1)
		.get()
		.then(snapshot => {
			if (snapshot.empty) return res.status(400).json({ error: 'User not found' });

			const user = snapshot.docs[0].data();
			delete user.password;
			return res.json({ user });
		})
		.catch(err => {
			console.log(`Error getting documents, error: ${err}`);
			res.status(500).json({ error: err.code });
		});
};

/**
 * method: GET
 * Check if username is allready taken
 * @param req.params.username username
 * @param res
 */
exports.checkUsername = (req, res) => {
	// Validate id
	if (!req.params) return res.status(400).json({ error: 'Invalid user id' });

	// Get user id
	const username = req.params.username;
	//require('../lib').logObj(req.params);

	// Get user details from firebase
	db.collection(`users`)
		.doc(username)
		.get()
		.then(doc => {
			// require('../lib').logObj(doc);
			if (!doc.exists) return res.status(404).json({ success: false, error: 'User not found' });
			else return res.status(200).json({ success: true, message: 'User found in database' });
		})
		.catch(err => {
			console.log(`Error getting documents, error: ${err}`);
			res.status(500).json({ error: err.code });
		});
};
