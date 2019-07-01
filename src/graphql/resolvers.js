const usersResolver = require('./resolvers/users');
const carsResolver = require('./resolvers/cars');

module.exports = Object.assign({}, usersResolver, carsResolver);
