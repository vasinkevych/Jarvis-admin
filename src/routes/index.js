const path = require('path');
const createReadStream = require('fs').createReadStream;
const EmailService = require('../services/email.service');
const UsersService = require('../services/users.service');
const DatabaseService = require('../services/database.service');
const SystemService = require('../services/system.service');
const getCurrentUserRoles = require('../services/roles');

module.exports = ({ router }) => {
  /* admin panel  */
  router.get('/admin/api/execute-sql', ctx => {
    return DatabaseService.runSql(ctx.query.query)
      .then(result => {
        ctx.status = 200;
        ctx.body = { result };
      })
      .catch(err => {
        ctx.throw(400, err);
      });
  });

  router.get('/api/parse', ctx => {
    return SystemService.saveDumpPublishToCloudAndParseXLS()
      .then(() => {
        ctx.status = 200;
        // ctx.statusText = statusText;
        ctx.body = 'ok';
      })
      .catch(err => {
        ctx.throw(400, err);
      });
  });

  /* APIs */
  router.get('/api/send-email/:car_number', ctx => {
    return UsersService.getUserByNumber(ctx.params.car_number)
      .then(user =>
        EmailService.sendEmail({
          to: user.email,
          subject: 'test subject',
          html: '<div>Test html...</div>'
        })
      )
      .then(() => (ctx.body = { status: 'ok' }))
      .catch(() => {});
  });

  router.post('/api/v1/process-number', ctx => {
    const data = ctx.request.body;

    return UsersService.getUserByNumber(data)
      .then(user => (ctx.body = user))
      .catch(e => {
        console.error(e);
      });
  });

  router.post('/api/v1/find', ctx => {
    const data = ctx.request.body;

    return UsersService.findUsers(data)
      .then(user => (ctx.body = user))
      .catch(e => {
        console.error(e);
      });
  });

  router.get('/api/v1/roles', ctx => {
    const { authorization } = ctx.request.headers;

    return getCurrentUserRoles({ authorization }).then(roles => {
      ctx.status = 200;
      ctx.body = roles;
    });
  });

  router.get('*', ctx => {
    const reader = createReadStream(
      path.join(__dirname, '../public/index.html')
    );
    return new Promise(resolve => {
      reader.on('data', chunk => {
        ctx.type = 'html';
        ctx.body = chunk.toString();
        resolve();
      });
    });
  });
};
