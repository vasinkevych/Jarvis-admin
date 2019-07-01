const mysql = require('mysql');
const config = require('../configs/config.json');

// const env = process.argv[2] || 'prod';

module.exports = {
  getConnection() {
    let connection = mysql.createConnection({
      host: process.env.DATABASE_HOST || config.dev.host,
      database: process.env.DATABASE_NAME || config.dev.database,
      user: process.env.DATABASE_USER || config.dev.user,
      password: process.env.DATABASE_PASSWORD || config.dev.password,
      charset: config.dev.charset
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
  }
};
