const cron = require('node-cron');
const OffCode = require('../models/offCodeSchema'); 

const deleteExpiredOffCodes = () => {
  cron.schedule('0 0 * * *', async () => {
    const now = new Date();
    const result = await OffCode.deleteMany({ expireDate: { $lt: now } });
    console.log(`Expired offcodes cleanup done, removed ${result.deletedCount} items.`);
  });
};

module.exports = deleteExpiredOffCodes;