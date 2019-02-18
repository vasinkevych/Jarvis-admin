const Koa = require('koa');
const app = new Koa();
const EmailService = require('./services/email.service');
const UsersService = require('./services/users.servise');

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

app.use(router);

app.listen(process.env.PORT || 3000);
