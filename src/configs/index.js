require('dotenv').config();

module.exports = {
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN || '',
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE || ''
};
