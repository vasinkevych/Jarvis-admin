const SystemService = require('./services/system.service');

console.log('start cron...');
SystemService.saveDumpPublishToCloudAndParceXLS()
  .then(() => {
    console.log('end cron...');
  });

