const mysqldump = require('mysqldump');
const configs = require('../configs');
const DatabaseService = require('../services/database.service');
const path = require('path');
const appDir = path.dirname(require.main.filename);
const { sendDumpToStorage } = require('./storage.service');

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
    await sendDumpToStorage(filePath);
  },

  clearUsersTable() {
    return DatabaseService.runSql('TRUNCATE TABLE users;');
  },

  clearCarsTable() {
    return DatabaseService.runSql('TRUNCATE TABLE cars;');
  },

  clearUsersCarsTable() {
    return DatabaseService.runSql('TRUNCATE TABLE users_cars;');
  },

  clearDatabase() {
    return this.clearUsersCarsTable()
      .then(() => this.clearCarsTable())
      .then(() => this.clearUsersTable());
  }
};
