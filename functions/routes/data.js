// Data routes

const { db } = require('../admin');

// GET all sensor data
exports.getData = (req, res) => {
	db.collection('sensors')
		.orderBy('date', 'desc')
		.get()
		.then(snapshot => {
			let sensorsData = [];
			snapshot.forEach(doc => sensorsData.push(doc.data()));
			res.json(sensorsData);
		})
		.catch(err => {
			console.log(`Error getting documents, error: ${err}`);
			res.json(err);
		});
};

// POST sensor data
exports.postData = (req, res) => {
	// Create new document
	const sensorData = {
		arduino: req.body.arduino,
		co2: req.body.co2,
		humidity: req.body.humidity,
		temperature: req.body.temperature,
		date: new Date().toISOString()
	};

	//console.log('TCL: exports.postData -> sensorData', JSON.stringify(sensorData, null, 2));

	// Add new document to firebase
	db.collection('sensors')
		.add(sensorData)
		.then(doc => {
			res.json({ message: `Added document with name: ${doc.id}` });
		})
		.catch(err => {
			res.status(500).json({
				error: `Error adding new document, error: ${err}`
			});
			console.log(`Error adding new document, error: ${err}`);
		});
};
