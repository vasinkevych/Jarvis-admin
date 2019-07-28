const UsersService = require('../../services/users.servise');
const CarsService = require('../../services/cars.servise');
const HelpersGraphQLService = require('../helpers');

module.exports = {
  users() {
    return UsersService.getUserDetails()
      .then(data => UsersService.parseUserData(data))
      .then(users => HelpersGraphQLService.resolverAttachCarsToUsers(users));
  },

  user(args) {
    return UsersService
      .getUserDetails(args.id)
      .then(data => UsersService.parseUserData(data))
      .then(data => {
        if (data[0]) {
          return data[0];
        }
        return null;
      })
      .then(user =>
        HelpersGraphQLService.resolverAttachCarsToUser(user)
      );
  }
};
