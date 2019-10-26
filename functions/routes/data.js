// Data routes

const { db } = require('../admin');

// GET methosds

/**
 * method: GET
 * Retreive limited number of sonsors data
 * @param limit sensors data to send
 */
const getData = limit => (req, res) => {
	db.collection('sensors')
		.orderBy('date', 'desc')
		.limit(limit)
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

/**
 * Retreive all sensor data
 */
exports.getAllSensorData = getData(0);

/**
 * Retreive first 10 sensors data
 */
exports.getSensorDataTop10 = getData(10);

// POST methosds

/**
 * method: POST
 * Retreive sensor data in requested range of dates
 * @param req
 * @param res
 */
exports.getSensorDataInRange = (req, res) => {
	const { from, to } = req.body;
	const dateFrom = new Date(from);
	const dateTo = new Date(to);

	db.collection('sensors')
		.orderBy('date', 'desc')
		.where('date', '>=', dateFrom)
		.where('date', '<', dateTo)
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

/**
 * method: POST
 * Create new sensor data
 * @param req
 * @param res
 */
exports.createSensorData = (req, res) => {
	// Create new document
	const sensorData = { ...req.body, date: new Date() /*.toISOString()*/ };
	//require('../lib').logObj(sensorData);

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
