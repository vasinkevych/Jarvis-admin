require('dotenv').config();

module.exports = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID || '',
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN || '',
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE || '',
  CLIENT_EMAIL: process.env.CLIENT_EMAIL || '',
  PRIVATE_KEY: process.env.PRIVATE_KEY.replace(/\\n/g, '\n') || '',
  SPREAD_SHEET_ID: process.env.SPREAD_SHEET_ID || '',
  SPREAD_SHEET_RANGE:
    process.env.SPREAD_SHEET_RANGE || 'Список власників автомобілів!A2:I1000',
  DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
  DATABASE_NAME: process.env.DATABASE_NAME || 'reactnativess',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'root',
  DATABASE_USER: process.env.DATABASE_USER || 'root',
  CHARSET: process.env.CHARSET || 'utf8',
  SEND_EMAIL_USER: process.env.SEND_EMAIL_USER || '',
  SEND_EMAIL_PASSWORD: process.env.SEND_EMAIL_PASSWORD || '',
  SEND_FROM: process.env.SEND_FROM || '',
  SEND_SERVICE: process.env.SEND_SERVICE || 'gmail',
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.PORT || 'dev'
};
