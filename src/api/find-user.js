const UsersService = require('../services/users.service');
const OpenDBService = require('../services/openDataBot.service');

const findUser = ctx => {
  const data = ctx.request.body;

  return UsersService.findUsers(data)
    .then(users => Promise.all(mapCarData(users)))
    .then(user => (ctx.body = user))
    .catch(e => {
      console.error(e);
    });
};

const mapCarData = users =>
  users.map(user =>
    OpenDBService.getCarRegistrations({ carNumber: user.carNumber }).then(
      carData => ({ ...user, carData })
    )
  );

module.exports = findUser;
