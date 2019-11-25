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
        .on('end', () => console.log('Read stream has been finished'))
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

      console.log('Start of reading file from storage');
      await this.downloadFileFromStorage(file, dumpPath);
      console.log('Write stream has been finished');
      await dbService.clearDatabase();
      console.log('Database clearing has been finished');

      fileData = await fsp.readFile(dumpPath);
      console.log('FileData: ', !!fileData);
      await dbService.runSql(fileData.toString());
      console.log('data was imported successfully');
    } catch (e) {
      throw new Error('Importing dump error: ' + e.message);
    } finally {
      await fsp.unlink(dumpPath);
    }
  }
};
