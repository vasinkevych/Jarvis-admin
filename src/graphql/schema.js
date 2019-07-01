const { buildSchema } = require('graphql');
const usersSchemas = require('./schemas/users');
const carsSchemas = require('./schemas/cars');

module.exports = buildSchema(`
  ${usersSchemas.User}
  
  ${carsSchemas.Car}

  type Query {
    ${usersSchemas.UserQueries}
    ${carsSchemas.CarQueries}
  }
`);
