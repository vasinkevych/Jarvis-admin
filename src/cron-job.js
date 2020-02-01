/* eslint-disable no-console */
const SystemService = require('./services/system.service');

console.log('start cron...');
SystemService.saveDumpPublishToCloudAndParseXLS().then(() => {
  console.log('end cron...');
});
