const exec = require('child_process').exec;
const mysqldump = require('mysqldump');
const config = require('../configs/config.json');
const DatabaseService = require('../services/database.service');

const env = process.env.NODE_ENV || 'dev';

module.exports = {

  getDatabaseDump() {
    return mysqldump({
      connection: {
        host: process.env.DATABASE_HOST || config.dev.host,
        database: process.env.DATABASE_NAME || config.dev.database,
        user: process.env.DATABASE_USER || config.dev.user,
        password: process.env.DATABASE_PASSWORD || config.dev.password,
      },
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
