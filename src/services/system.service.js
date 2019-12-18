const mysqldump = require('mysqldump');
const configs = require('../configs');
const DatabaseService = require('./database.service');
const path = require('path');
// const appDir = path.dirname(require.main.filename);
const appDir = '../';

const StorageService = require('./storage.service');
const GoogleSheetToJSON = require('./google-api.service');
const UsersService = require('./users.service');
const ParseService = require('./parser.service');

module.exports = {
  async getDatabaseDump() {
    const filePath = path.resolve(appDir, 'tmp', `${Date.now()}-dump.sql`);

    try {
      await mysqldump({
        connection: {
          host: configs.DATABASE_HOST,
          database: configs.DATABASE_NAME,
          user: configs.DATABASE_USER,
          password: configs.DATABASE_PASSWORD
        },
        dumpToFile: filePath
      });
    } catch (e) {
      throw new Error('Dump creation error: ' + e.message);
    }

    return filePath;
  },

  async saveFileToCloud(filePath) {
    await StorageService.sendDumpToStorage(filePath);
  },

  saveDumpPublishToCloudAndParceXLS() {
    const {
      CLIENT_EMAIL,
      PRIVATE_KEY,
      SPREAD_SHEET_ID,
      SPREAD_SHEET_RANGE
    } = configs;

    const gSheetToJSON = new GoogleSheetToJSON({
      CLIENT_EMAIL,
      PRIVATE_KEY
    });

    return this.getDatabaseDump()
      .then(filePath => this.saveFileToCloud(filePath))
      .then(() => DatabaseService.clearDatabase())
      .then(() => {
        return gSheetToJSON.getJson({
          spreadsheetId: SPREAD_SHEET_ID,
          range: SPREAD_SHEET_RANGE
        });
      })
      .then(({ data, status = 401, statusText }) => {
        return new ParseService().normalizeRows(data.values);
      })
      .then(data => {
        return UsersService.bulkAddUsers(data);
      });
  }
};
