const Koa = require('koa');
const app = new Koa();
const EmailService = require('../src/services/email.service');
const UsersService = require('../src/services/users.service');

const Router = require('koa2-router');
const router = Router();
router.get('/send-email/:car_number', (ctx) => {
	UsersService.getUserByNumber(car_number)
		.then(user => EmailService.sendEmail({
			to: user.email,
			subject: 'test subject',
			html: '<div>Test html...</div>'
		}))
		.then((response) => ctx.body = {status: 'ok'})
		.catch(() => {});
});

app.use(router);

app.listen(3000);