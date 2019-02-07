const assert = require('chai').assert;
const EmailService = require('../src/services/email.service');


describe('emailer', () => {
    it('should send email', (done) => {
		EmailService.sendEmail({
			to: 'vivanch@softserveinc.com',
			subject: 'test subject',
			html: '<div>Test html...</div>'
        }).then((result) => {
			assert.equal(result.accepted[0], 'vivanch@softserveinc.com');
            done();
        });
    });
});