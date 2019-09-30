const nodemailer = require('nodemailer');
const configs = require('../configs');

module.exports = {
  getTransporter() {
    return nodemailer.createTransport({
      service: configs.SEND_SERVICE,
      auth: {
        user: configs.SEND_EMAIL_USER,
        pass: configs.SEND_EMAIL_PASSWORD
      }
    });
  },

  sendEmail(mailOptions) {
    return new Promise((resolve, reject) => {
      const transporter = this.getTransporter();
      const options = Object.assign({}, mailOptions, {
        from: config.email.from
      });
      transporter.sendMail(options, (err, info) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(info);
      });
    });
  }
};
