const exec = require('child_process').exec;
const mysqldump = require('mysqldump');
const configs = require('../configs');

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
      const cmd = `node ${
        process.env.PATH
      }/db-migrate down -c 99 --config ./src/configs/config.json --migrations-dir ./src/migrations -e ${
        configs.NODE_ENV
      }`;
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
