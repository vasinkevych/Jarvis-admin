const getCurrentUserRoles = require('../services/roles');

const getUserRoles = ctx => {
  const { authorization } = ctx.request.headers;

  return getCurrentUserRoles({ authorization }).then(roles => {
    ctx.status = 200;
    ctx.body = roles;
  });
};

module.exports = getUserRoles;
