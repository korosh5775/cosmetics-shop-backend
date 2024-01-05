// Import necessary modules
// ------------------------------------------------
const cron = require('node-cron'); // Library for scheduling tasks
const OffCode = require('../models/offCodeSchema'); // Mongoose model for off codes

// Function to delete expired off codes
// ------------------------------------------------
const deleteExpiredOffCodes = async () => {
  console.log('Running a job at 00:00 to delete expired off codes');
  try {
    // Get the current time
    const now = new Date();
    // Delete all off codes that have expired
    const result = await OffCode.deleteMany({ expireDate: { $lt: now } }); // Use the less than operator to find expired codes
    console.log(`Expired offcodes cleanup done, removed ${result.deletedCount} items.`);
  } catch (error) {
    console.error('Failed to delete expired offcodes:', error);
  }
};

// Schedule the job to run at midnight every day
// ------------------------------------------------
cron.schedule('0 0 * * *', deleteExpiredOffCodes); // Syntax for midnight every day

// Export the function for external use
// ------------------------------------------------
module.exports = { deleteExpiredOffCodes };
