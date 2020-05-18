/**
 * Data controller
 */

const { db } = require('../../admin');
const { ErrorHandler } = require('../../errors');

/************************************************************
 * Retreive last N rows of sonsors data from database
 * @param {string} n Limit retreived rows
 ************************************************************/
exports.select = (req, res, next) => {
  db.collection('sensors')
    .orderBy('date', 'desc')
    .limit(+req.params.n)
    .get()
    .then(snapshot => {
      const sensorsData = [];
      snapshot.forEach(doc => sensorsData.push(doc.data()));
      res.status(200).json({ status: 'ok', data: sensorsData });
    })
    .catch(err => {
      console.log(`Error in getting sensor data, error: ${err.message}`);
      next(new ErrorHandler(err));
    });
};
/************************************************************/

/************************************************************
 * method: POST
 * Retreive sensor data in requested range of dates
 * @param req
 * @param res
 ************************************************************/
exports.selectFromTo = ({ body }, res, next) => {
  const { from, to } = body;
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
      res.status(200).json({ status: 'ok', data: sensorsData });
    })
    .catch(err => {
      console.log(`Error in getting sensor data, error: ${err.message}`);
      next(new ErrorHandler(err));
    });
};
/************************************************************/

/************************************************************
 * method: POST
 * Create new sensor data
 * @param req
 * @param res
 ************************************************************/
exports.insert = (req, res) => {
  // Create new document
  const sensorData = { ...req.body, date: new Date() /*.toISOString()*/ };

  // Add new document to firebase
  db.collection('sensors')
    .add(sensorData)
    .then(doc => {
      res
        .status(200)
        .json({ status: 'ok', data: `Added document with name: ${doc.id}` });
    })
    .catch(err => {
      console.log(`Error in inserting new sensor data, error: ${err.message}`);
      next(new ErrorHandler(err));
    });
};
/************************************************************/
