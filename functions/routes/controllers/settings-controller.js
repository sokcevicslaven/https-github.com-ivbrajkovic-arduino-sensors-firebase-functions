/**
 * Settings controller
 */

const { db } = require('../../admin');
const { errorMessages, ErrorHandler } = require('../../errors');

/**************************************************************
* Select all arduinos settings
@returns {*} Response object and status code
***************************************************************/
exports.select = (req, res, next) =>
  db
    .collection('settings')
    .get()
    .then(snapshot => {
      const data = [];
      snapshot.forEach(doc =>
        data.push({
          arduino: doc.id,
          settings: doc.data()
        })
      );
      if (data.length > 0) res.status(200).json({ status: 'ok', data });
      else next(new ErrorHandler(errorMessages.DB_DOCUMENT_NOT_FOUND));
    })
    .catch(err => {
      console.log(`Error in getting arduino settings, error: ${err}`);
      next(new ErrorHandler(err));
    });
/**************************************************************/

/**************************************************************
* Select setting by arduino id
@param {*} data Client req 
@returns {*} Response object and status code
***************************************************************/
exports.selectId = ({ params }, res, next) =>
  db
    .collection('settings')
    .doc(params.id)
    .get()
    .then(doc => {
      if (doc.exists) res.status(200).json({ status: 'ok', data: doc.data() });
      else next(new ErrorHandler(errorMessages.DB_DOCUMENT_NOT_FOUND));
    })
    .catch(err => {
      console.log(`Error in getting arduino settings, error: ${err}`);
      next(new ErrorHandler(err));
    });
/**************************************************************/

// /**************************************************************
// * Select setting by arduino id
// @param {*} data Client req
// @returns {*} Response object and status code
// ***************************************************************/
// exports.selectId = ({ params }) =>
//   new Promise((resolve, reject) => {
//     db.collection('settings')
//       .doc(params.id)
//       .get()
//       .then(doc => {
//         if (doc.exists) resolve(doc.data());
//         else reject(new ErrorHandler(errorMessages.DB_DOCUMENT_NOT_FOUND));
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// /**************************************************************/
