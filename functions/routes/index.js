// Routes

module.exports = {
	login: require('./login').login,
	signup: require('./signup').signup,
	createSensorData: require('./data').createSensorData,
	getAllSensorData: require('./data').getAllSensorData,
	getSensorDataTop10: require('./data').getSensorDataTop10,
	getSensorDataInRange: require('./data').getSensorDataInRange
};
