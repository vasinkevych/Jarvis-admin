const admin = require('firebase-admin');
const fs = require('fs').promises;
const configs = require('../configs');

let serviceAccount = configs.FIREBASE_ACCOUNT_CREDITS;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://react-native-33df6.appspot.com'
});

module.exports = {
  sendDumpToStorage: async filePath => {
    let bucket;

    try {
      bucket = await admin.storage().bucket();
    } catch (e) {
      throw new Error('Storage connection error: ' + e.message);
    }

    try {
      await bucket.upload(filePath);

      await fs.unlink(filePath);
    } catch (e) {
      throw e;
    }
  },

  getDumpsMetadata: async () => {
    let bucket;

    try {
      bucket = await admin.storage().bucket();
    } catch (e) {
      throw new Error('Storage connection error: ' + e.message);
    }

    try {
      const res = await bucket.getFiles();
      return res[0].map(file => file.metadata);
    } catch (e) {
      throw new Error('Get files error: ' + e.message);
    }
  }
};
