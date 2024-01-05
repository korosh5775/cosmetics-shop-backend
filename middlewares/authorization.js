// Import necessary module
// ------------------------------------------------
const jwt = require("jsonwebtoken");

// Define the authenticated middleware function
// ------------------------------------------------
const authenticated = (req, res, next) => {
 try {
   // Extract the Authorization header from the request
   // ------------------------------------------------
   const authHeader = req.get("Authorization");

   // Handle missing Authorization header
   // ------------------------------------------------
   if (!authHeader) {
     const err = new Error("You are not allowed"); // Error message
     err.statusCode = 403; // Forbidden status code
     throw err; // Throw the error for handling
   }

   // Extract the token from the Authorization header
   // ------------------------------------------------
   const token = authHeader.split(" ")[1]; // Assuming "Bearer" token format

   // Verify the token using the secret key
   // ------------------------------------------------
   const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

   // Handle invalid token
   // ------------------------------------------------
   if (!decodedToken) {
     const err = new Error("You are not allowed"); // Error message
     err.statusCode = 401; // Unauthorized status code
     throw err; // Throw the error for handling
   }

   // Attach the user ID from the decoded token to the request object
   // ------------------------------------------------
   req.userId = decodedToken.userId; // Make user ID available for later use

   // Proceed to the next middleware/route
   // ------------------------------------------------
   next();
 } catch (err) {
   // Pass errors to error handling middleware
   // ------------------------------------------------
   next(err);
 }
};

// Export the authenticated middleware
// ------------------------------------------------
module.exports = authenticated;
