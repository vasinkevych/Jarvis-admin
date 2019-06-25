const UsersService = require('../../services/users.servise');
const CarsService = require('../../services/cars.servise');
const HelpersGraphQLService = require('../helpers');

module.exports = {
  users() {
    return UsersService.getAllUsers()
      .then(users => HelpersGraphQLService.resolverAttachCarsToUsers(users))
  },
  user(args) {
    return UsersService.getUserById(args.id)
      .then(user => HelpersGraphQLService.resolverAttachCarsToUser(user));
  }
};
