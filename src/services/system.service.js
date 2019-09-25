const exec = require('child_process').exec;
const mysqldump = require('mysqldump');
const config = require('../configs/config.json');

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

  migrationsUp() {
    return new Promise((resolve, reject) => {
      const cmd = `node ../node_modules/db-migrate/bin/db-migrate up --config ./src/configs/config.json --migrations-dir ./src/migrations -e ${env}`;
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(stdout || stderr);
      });
    });
  },

  migrationsDown() {
    return new Promise((resolve, reject) => {
      const cmd = `node ../node_modules/db-migrate/bin/db-migrate down -c 99 --config ./src/configs/config.json --migrations-dir ./src/migrations -e ${env}`;
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(stdout || stderr);
      });
    });
  }
};
