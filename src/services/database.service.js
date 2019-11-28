const mysql = require('mysql');
const configs = require('../configs');

module.exports = {
  getConnection() {
    let connection = mysql.createConnection({
      host: configs.DATABASE_HOST,
      database: configs.DATABASE_NAME,
      user: configs.DATABASE_USER,
      password: configs.DATABASE_PASSWORD,
      charset: configs.CHARSET,
      multipleStatements: true
    });
    connection.connect(err => {
      if (err) {
        console.log('database error...', err);
      }
    });
    return connection;
  },

  runSql(sql) {
    return new Promise((resolve, reject) => {
      let connection = this.getConnection();
      connection.query(sql, (err, results, fields) => {
        if (err) {
          console.log('err', err);
          return reject(err);
        }
        resolve(results);
      });
      connection.end();
    });
  },

  clearUsersTable() {
    return this.runSql('TRUNCATE TABLE users;');
  },

  clearCarsTable() {
    return this.runSql('TRUNCATE TABLE cars;');
  },

  clearUsersCarsTable() {
    return this.runSql('TRUNCATE TABLE users_cars;');
  },

  clearUserContactsTable() {
    return this.runSql('TRUNCATE TABLE user_contacts;');
  },

  clearMigrationsTable() {
    return this.runSql('TRUNCATE TABLE migrations;');
  },

  clearDatabase() {
    return Promise.all([
      this.clearUsersTable(),
      this.clearCarsTable(),
      this.clearUsersCarsTable(),
      this.clearUserContactsTable(),
      this.clearMigrationsTable()
    ]);
  }
};
