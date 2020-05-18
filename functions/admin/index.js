// Firebase

const admin = require('firebase-admin');

const serviceAccount = require('./arduino-sensors-754e5-firebase-adminsdk-ougk3-b34ba28af4.json');

// Initialize the default app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://arduino-sensors-754e5.firebaseio.com'
});

// Firestore instance
const db = admin.firestore();

// Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyDRNscvyAJWG8BtnpCBw3tCpYEWem2jSAw',
  authDomain: 'arduino-sensors-754e5.firebaseapp.com',
  databaseURL: 'https://arduino-sensors-754e5.firebaseio.com',
  projectId: 'arduino-sensors-754e5',
  storageBucket: 'arduino-sensors-754e5.appspot.com',
  messagingSenderId: '940139731983',
  appId: '1:940139731983:web:3f15975a429e3d9ad7577a'
};

// Firebase
const firebase = require('firebase').initializeApp(firebaseConfig);

module.exports = {
  db,
  admin,
  firebase
};
