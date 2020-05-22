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
exports.login = async ({ body }, res, next) => {
  try {
    // Login user
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(body.email, body.password);

    const uid = userCredential.user.uid;
    const token = await userCredential.user.getIdToken();

    const snapshot = await db
      .collection('users')
      .where('uid', '==', uid)
      .limit(1)
      .get();

    // Ithere are no details of user
    if (snapshot.empty) return res.status(200).json({ token });

    // Get user details
    const user = snapshot.docs[0].data();
    res.status(200).json({ status: 'ok', data: { user, token } });
  } catch (err) {
    console.error('exports.login -> err', err);
    if (err.code === 'auth/user-not-found')
      next(new ErrorHandler(errorMessages.USER_NOT_EXIST));
    else if (err.code === 'auth/wrong-password')
      next(new ErrorHandler(errorMessages.USER_PASSWORD_NOT_MATCH));
    else next(new ErrorHandler(err));
  }
};
/**************************************************************/

/**************************************************************
* Register user by email and password
@param {*} data Client req 
@returns {*} Response object and status code
***************************************************************/
exports.register = async ({ body }, res, next) => {
  try {
    const { name, lastname, username, email, password } = body;

    // Create new user and get his token
    const _username = await db.collection('users').doc(username).get();

    if (_username.exists)
      throw new ErrorHandler(errorMessages.USER_USERNAME_ALREADY_TAKEN);

    // Create new user
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    // Get user token
    const token = await userCredential.user.getIdToken();

    // Get user initials
    const initials = `${name[0].toUpperCase() || ''}${
      lastname[0].toUpperCase() || ''
    }`;

    // Update display name
    await userCredential.user.updateProfile({ displayName: initials });

    // Add user into users
    const uid = userCredential.user.uid;
    await db
      .collection('users')
      .doc(uid)
      .set({ name, lastname, username, email });

    res
      .status(201)
      .json({ status: 'ok', data: { user: { name, lastname, email }, token } });
  } catch (err) {
    if (err.code === 'auth/email-already-in-use')
      next(new ErrorHandler(errorMessages.USER_EXIST));
    else if (err.code === 'auth/weak-password')
      next(new ErrorHandler(errorMessages.USER_PASSWORD_WEAK));
    else next(new ErrorHandler({ ...err, showStack: true }));
  }
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
