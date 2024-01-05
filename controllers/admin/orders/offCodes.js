// Import necessary modules
// ------------------------------------------------
const OffCode = require("../../../models/offCodeSchema");

// Define the createOffCode function
// ------------------------------------------------
const createOffCode = async (req, res, next) => {
 try {
   // Extract data from the request body
   // ------------------------------------------------
   const { code, items, percent, startDate, expireDate } = req.body;

   // Validate code uniqueness
   // ------------------------------------------------
   const existingOffCode = await OffCode.findOne({ code });
   if (existingOffCode) {
     const err = new Error("OffCode already exists.");
     err.statusCode = 409; // Conflict
     throw err;
   }

   // Validate percent range
   // ------------------------------------------------
   if (percent < 0 || percent > 100) { // Corrected typo: "&&" to "||"
     const err = new Error("Invalid discount percent.");
     err.statusCode = 400; // Bad request
     throw err;
   }

   // Validate expiration date
   // ------------------------------------------------
   if (new Date(expireDate) < new Date()) {
     const err = new Error("Invalid expiration date.");
     err.statusCode = 400; // Bad request
     throw err;
   }

   // Validate start date
   // ------------------------------------------------
   if (new Date(startDate) <= new Date()) {
     const err = new Error("The start date cannot be in the past.");
     err.statusCode = 422; // Unprocessable Entity
     throw err;
   }

   // Ensure expiration date is after start date
   // ------------------------------------------------
   if (new Date(expireDate) <= new Date(startDate)) {
     const err = new Error("The expiration date must be after the start date.");
     err.statusCode = 422; // Unprocessable Entity
     throw err;
   }

   // Validate presence of items
   // ------------------------------------------------
   if (items && items.length === 0) {
     const err = new Error("No products associated with the offcode.");
     err.statusCode = 400; // Bad request
     throw err;
   }

   // Create a new OffCode object
   // ------------------------------------------------
   const newOffCode = new OffCode({
     code,
     items,
     percent,
     startDate: new Date(startDate),
     expireDate: new Date(expireDate),
   });

   // Save the offcode to the database
   // ------------------------------------------------
   const savedOffCode = await newOffCode.save();

   // Send a success response with the saved offcode
   // ------------------------------------------------
   return res.status(201).json(savedOffCode);
 } catch (error) {
   next(error);
 }
};

// Export the createOffCode function
// ------------------------------------------------
module.exports = createOffCode;
