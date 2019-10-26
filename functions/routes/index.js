// Routes

module.exports = {
	getAllSensorData: require('./data').getAllSensorData,
	getSensorDataTop10: require('./data').getSensorDataTop10,
	getSensorDataInRange: require('./data').getSensorDataInRange,
	createSensorData: require('./data').createSensorData,
	signUp: require('./signUp').signUp,
	signIn: require('./signIn').signIn
};
