const { buildSchema } = require('graphql');
const usersSchemas = require('./schemas/users');
const carsSchemas = require('./schemas/cars');
const dumpSchemas = require('./schemas/dumps');

module.exports = buildSchema(`
  ${usersSchemas.User}
  
  ${carsSchemas.Car}
  
  ${dumpSchemas.Dump}

  type Query {
    ${usersSchemas.UserQueries}
    ${carsSchemas.CarQueries}
    ${dumpSchemas.DumpQueries}
  }
`);
