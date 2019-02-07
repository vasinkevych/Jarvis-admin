const nodemailer = require('nodemailer');
const config = require('../configs/config.json');

module.exports = {
	getTransporter() {
		return nodemailer.createTransport({
			service: config.email.service,
			auth: {
				user: config.email.user,
				pass: config.email.password
			}
		});
	},
	
	sendEmail(mailOptions) {
		return new Promise((resolve, reject) => {
			const transporter = this.getTransporter();
			const options = Object.assign({}, mailOptions, {
				from: config.email.from
			});
			transporter.sendMail(options, (err, info) =>  {
				if(err) {
					reject(err);
					return;
				}
				resolve(info);
			});
		});
	}
};