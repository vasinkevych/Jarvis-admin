const exec = require('child_process').exec;
const mysqldump = require('mysqldump');
const configs = require('../configs');
const DatabaseService = require('../services/database.service');

module.exports = {
  getDatabaseDump() {
    return mysqldump({
      connection: {
        host: configs.DATABASE_HOST,
        database: configs.DATABASE_NAME,
        user: configs.DATABASE_USER,
        password: configs.DATABASE_PASSWORD
      }
    });
  },

  // TODO
  saveFileToCloud(sqlDump) {
    return Promise.resolve();
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
      .then(() => this.clearUsersTable())
  }

};
