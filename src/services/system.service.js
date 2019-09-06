const exec = require('child_process').exec;

const env = process.env.NODE_ENV || 'dev';

module.exports = {
  migrationsUp() {
    return new Promise((resolve, reject) => {
      const cmd = `node ./node_modules/db-migrate/bin/db-migrate up --config ./src/configs/config.json --migrations-dir ./src/migrations -e ${env}`;
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
    console.log('migrationsDown...');
    return new Promise((resolve, reject) => {
      const cmd = `node ./node_modules/db-migrate/bin/db-migrate down -c 99 --config ./src/configs/config.json --migrations-dir ./src/migrations -e ${env}`;
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        console.log('stdout = ', stdout);
        console.log('stderr = ', stderr);
        resolve(stdout || stderr);
      });
    });
  }
};
