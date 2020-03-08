const path = require('path');
const createReadStream = require('fs').createReadStream;

module.exports = ({ router }) => {
  /* admin panel  */
  router.get('/admin/api/execute-sql', require('../api/execute-sql'));
  router.get('/api/parse', require('../api/parse'));

  /* APIs */
  router.get('/api/send-email/:car_number', require('../api/send-mail'));
  router.post('/api/v1/process-number', require('../api/process-number'));
  router.post('/api/v1/find', require('../api/find-user'));
  router.get('/api/v1/roles', require('../api/roles'));

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
