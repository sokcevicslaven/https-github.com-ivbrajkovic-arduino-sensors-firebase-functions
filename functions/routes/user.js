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
	// Get user id
	const userId = req.params.id;
	//require('../lib').logObj(req.params);

	// Validate id
	if (!req.params) return res.status(400).json({ error: 'Invalid user id' });

	// Get user details from firebase
	db.collection(`users`)
		.where('userId', '==', userId)
		.limit(1)
		.get()
		.then(snapshot => {
			if (snapshot.empty) return res.status(400).json({ error: 'User not found' });

			return res.json(snapshot.docs[0].data());
		})
		.catch(err => {
			console.log(`Error getting documents, error: ${err}`);
			res.status(500).json({ error: err.toString() });
		});
};
