const UsersService = require('../services/users.service');

const processNumber = ctx => {
  const data = ctx.request.body;

  return UsersService.getUserByNumber(data)
    .then(user => (ctx.body = user))
    .catch(e => {
      console.error(e);
    });
};

module.exports = processNumber;
