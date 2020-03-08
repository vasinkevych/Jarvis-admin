const SystemService = require('../services/system.service');

const parse = ctx => {
  return SystemService.saveDumpPublishToCloudAndParseXLS()
    .then(() => {
      ctx.status = 200;
      // ctx.statusText = statusText;
      ctx.body = 'ok';
    })
    .catch(err => {
      ctx.throw(400, err);
    });
};

module.exports = parse;
