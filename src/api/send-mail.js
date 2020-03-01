const UsersService = require('../services/users.service');
const EmailService = require('../services/email.service');

const sendMail = ctx => {
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
};

module.exports = sendMail;
