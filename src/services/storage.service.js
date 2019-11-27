const admin = require('firebase-admin');
const fsp = require('fs').promises;
const fs = require('fs');
const path = require('path');
const configs = require('../configs');
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

  downloadFileFromStorage(fileRef, targetPath) {
    return new Promise((resolve, reject) => {
      fileRef
        .createReadStream()
        .pipe(fs.createWriteStream(targetPath))
        .on('finish', () => resolve())
        .on('error', err => reject(err));
    });
  },

  async importDatabase(fileName) {
    const dumpPath = path.join(appDir, 'tmp', 'imported-dump.sql');

    try {
      let fileData = '';
      let bucket = await admin.storage().bucket();
      const file = await bucket.file(fileName);

      await this.downloadFileFromStorage(file, dumpPath);

      await dbService.clearDatabase();

      fileData = await fsp.readFile(dumpPath);

      await dbService.runSql(fileData.toString());
    } catch (e) {
      throw new Error('Importing dump error: ' + e.message);
    } finally {
      const exists = await fsp.access(dumpPath);
      if (exists) await fsp.unlink(dumpPath);
    }
  }
};
