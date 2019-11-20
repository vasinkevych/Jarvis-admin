const usersResolver = require('./resolvers/users');
const carsResolver = require('./resolvers/cars');
const dumpResolver = require('./resolvers/dump');

module.exports = Object.assign({}, usersResolver, carsResolver, dumpResolver);
