const SystemService = require('./services/system.service');

console.warn('start cron...');
SystemService.saveDumpPublishToCloudAndParseXLS().then(() => {
  console.warn('end cron...');
});
