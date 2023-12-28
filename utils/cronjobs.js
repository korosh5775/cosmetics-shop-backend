const cron = require('node-cron');
const OffCode = require('../models/offCodeSchema');

// Function for deleting expired off codes
const deleteExpiredOffCodes = async () => {
  console.log('Running a job at 00:00 to delete expired off codes');
  try {
    //* Getting the current time
    const now = new Date();
    //* Removing all offCodes that have expired
    const result = await OffCode.deleteMany({ expireDate: { $lt: now } }); //* Using Less than operator
    console.log(`Expired offcodes cleanup done, removed ${result.deletedCount} items.`);
  } catch (error) {
    console.error('Failed to delete expired offcodes:', error);
  }
};

// Schedule the job to run at midnight every day
cron.schedule('0 0 * * *', deleteExpiredOffCodes);

module.exports = { deleteExpiredOffCodes };