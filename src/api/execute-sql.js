const DatabaseService = require('../services/database.service');

const parse = ctx => {
  return DatabaseService.runSql(ctx.query.query)
    .then(result => {
      ctx.status = 200;
      ctx.body = { result };
    })
    .catch(err => {
      ctx.throw(400, err);
    });
};

module.exports = parse;
