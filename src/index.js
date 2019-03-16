const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const createReadStream = require('fs').createReadStream;
const EmailService = require('./services/email.service');
const UsersService = require('./services/users.servise');

app.use(serve(__dirname + '/public'));

// TODO need to move routes to separated files;
const Router = require('koa2-router');
const router = Router();
router.get('/send-email/:car_number', ctx => {
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

// probably need to use koa-views or something... but if we have only one index.html.....
router.get('/admin-panel', (ctx) => {
  const reader = createReadStream(__dirname + '/public/index.html');
  return new Promise(resolve => {
    reader.on('data', (chunk) => {
      ctx.type = 'html';
      ctx.body = chunk.toString();
      resolve();
    });
  });

});

app.use(router);

app.listen(process.env.PORT || 3000);

console.log('listen ', process.env.PORT || 3000);
