const configs = require('../configs');
const winston = require('winston');
const { Loggly } = require('winston-loggly-bulk');

module.exports = {
  initializeLogger() {
    winston.add(
      new Loggly({
        token: configs.LOGGLY_CUSTOMER_TOKEN,
        subdomain: configs.LOGGLY_SUBDOMAIN,
        tags: ['Winston-NodeJS'],
        json: true
      })
    );
  }
};
