const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const createReadStream = require('fs').createReadStream;
const EmailService = require('./services/email.service');
const UsersService = require('./services/users.servise');
const DatabaseService = require('./services/database.service');

app.use(serve(__dirname + '/public'));

// TODO need to move routes to separated files;
const Router = require('koa2-router');
const router = Router();

app.use(async(ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  await next();
});

// probably need to use koa-views or something... but if we have only one index.html.....
router.get('/admin-panel', ctx => {
  const reader = createReadStream(__dirname + '/public/index.html');
  return new Promise(resolve => {
    reader.on('data', chunk => {
      ctx.type = 'html';
      ctx.body = chunk.toString();
      resolve();
    });
  });
});

/* admin panel  */
// TODO: need to add middleware to check permission;
router.get('/admin/api/execute-sql', ctx => {
  return DatabaseService.runSql(ctx.query.query)
    .then(result => {
      ctx.status = 200;
      ctx.body = { result };
    })
    .catch(err => ctx.body = err);
});

/* APIs */
router.get('/api/send-email/:car_number', ctx => {
  return UsersService.getUserByNumber(ctx.params.car_number)
    .then(user => EmailService.sendEmail({
      to: user.email,
      subject: 'test subject',
      html: '<div>Test html...</div>'
    }))
    .then(() => ctx.body = { status: 'ok' })
    .catch(() => {
    });
});

app.use(router);

app.listen(process.env.PORT || 3000);

console.log('listen ', process.env.PORT || 3000);
