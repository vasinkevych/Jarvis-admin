require('dotenv').config();
const winston = require('winston');
const { Loggly } = require('winston-loggly-bulk');

module.exports = {
  initializeLogger() {
    winston.add(
      new Loggly({
        token: process.env.CUSTOMER_TOKEN,
        subdomain: process.env.SUBDOMAIN,
        tags: ['Winston-NodeJS'],
        json: true
      })
    );
  }
};
