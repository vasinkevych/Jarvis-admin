const admin = require('firebase-admin');

let serviceAccount = require('../../react-native-33df6-firebase-adminsdk-t170o-37b9fe7653.json');

module.exports = async () => {
  await admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://react-native-33df6.appspot.com'
  });

  let bucket = await admin.storage().bucket();
  // console.log(bucket);

  await bucket.getFiles((err, files) => {
    if (err) {
      console.log(Object.assign({}, err));
      return;
    }
    console.log(files);
  });
};

// module.exports = async () => {
//   await admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://react-native-33df6.firebaseio.com'
//   });
//
//   let db = admin.database();
//
//   let dumpRef = db.ref('users');
//
//   await dumpRef.once('value', function(snapshot) {
//     console.log(snapshot.val());
//   });
// };
