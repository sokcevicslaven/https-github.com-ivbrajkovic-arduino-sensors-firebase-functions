/**
 * User controller
 */

const { firebase, db } = require('../../admin');
const { errorMessages, ErrorHandler } = require('../../errors');

/**************************************************************
* Register user by email and password
@param {*} data Client req 
@returns {*} Response object and status code
***************************************************************/
exports.login = ({ body }, res, next) => {
  let uid, token;

  firebase
    .auth()
    .signInWithEmailAndPassword(body.email, body.password)
    .then(({ user }) => {
      uid = user.uid;
      return user.getIdToken();
    })
    .then(_token => {
      token = _token;
      return db.collection('users').where('uid', '==', uid).limit(1).get();
    })
    .then(snapshot => {
      // Ithere are no details of user
      if (snapshot.empty) return res.status(200).json({ token });

      // Get user details
      const user = snapshot.docs[0].data();
      res.status(200).json({ status: 'ok', data: { user, token } });
    })
    .catch(err => {
      if (err.code === 'auth/user-not-found')
        next(new ErrorHandler(errorMessages.USER_NOT_EXIST));
      else if (err.code === 'auth/wrong-password')
        next(new ErrorHandler(errorMessages.USER_PASSWORD_NOT_MATCH));
      else next(new ErrorHandler(err));
    });
};
/**************************************************************/

/**************************************************************
* Register user by email and password
@param {*} data Client req 
@returns {*} Response object and status code
***************************************************************/
exports.register = ({ body }, res, next) => {
  // Create user object and append creation date
  // const body = {
  //   ...body,
  //   created: new Date() /*.toISOString()*/
  // };

  let token, uid;

  // Create new user and get his token
  db.collection('users')
    .doc(body.username)
    .get()
    .then(username => {
      if (username.exists)
        throw new ErrorHandler(errorMessages.USER_USERNAME_ALREADY_TAKEN);

      return firebase
        .auth()
        .createUserWithEmailAndPassword(body.email, body.password);
    })
    .then(({ user }) => {
      uid = user.uid;
      return user.getIdToken();
    })
    .then(_token => {
      token = _token;
      delete body.password;
      delete body.confirmPassword;
      return db
        .collection('users')
        .doc(body.username)
        .set({ ...body, uid });
    })
    .then(_ => {
      res.status(201).json({ status: 'ok', data: { user: body, token } });
    })
    .catch(err => {
      if (err.code === 'auth/email-already-in-use')
        next(new ErrorHandler(errorMessages.USER_EXIST));
      else if (err.code === 'auth/weak-password')
        next(new ErrorHandler(errorMessages.USER_PASSWORD_WEAK));
      else next(new ErrorHandler(err));
    });
};
/**************************************************************/

/**************************************************************
* Check if user exist by username or email
@param {*} data Client req 
@returns {*} Response object and status code
***************************************************************/
exports.checkUserByUsernameOrEmail = ({ params }, res, next) => {
  const { username, email } = params;
  const where = username
    ? ['username', '==', username]
    : ['email', '==', email];

  db.collection('users')
    .where(...where)
    .get()
    .then(snapshot => {
      // If no user in database return "ok"
      if (snapshot.empty) res.status(200).json({ status: 'ok' });
      else
        next(
          new ErrorHandler(
            username
              ? errorMessages.USER_USERNAME_ALREADY_TAKEN
              : errorMessages.USER_EXIST
          )
        );
    })
    .catch(err => next(new ErrorHandler(err)));
};
/**************************************************************/
