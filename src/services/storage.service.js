const admin = require('firebase-admin');
const fsp = require('fs').promises;
const fs = require('fs');
const path = require('path');
const configs = require('../configs');
const systemService = require('./system.service');
const appDir = path.dirname(require.main.filename);
const dbService = require('./database.service');

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

      await fsp.unlink(filePath);
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
  },

  importDatabase: async fileName => {
    try {
      let fileData = '';
      let bucket = await admin.storage().bucket();
      const file = bucket.file(fileName);
      const dumpPath = path.join(appDir, 'tmp', 'imported-dump.sql');

      await file
        .createReadStream()
        .on('end', async () => {
          await systemService.clearDatabase();
        })
        .pipe(fs.createWriteStream(dumpPath));

      fileData = await fsp.readFile(dumpPath);
      await dbService.runSql(fileData.toString());

      await fsp.unlink(dumpPath);
    } catch (e) {
      throw new Error('Restoring file error: ' + e.message);
    }
  }
};
