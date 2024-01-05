// Import necessary module
// ------------------------------------------------
const jwt = require("jsonwebtoken");

// Define the isAdmin middleware function
// ------------------------------------------------
const isAdmin = (req, res, next) => {
 try {
   // Extract the Authorization header from the request
   // ------------------------------------------------
   const authHeader = req.get("Authorization");

   // Extract the token from the Authorization header
   // ------------------------------------------------
   const token = authHeader.split(" ")[1]; // Assuming "Bearer" token format

   // Verify the token using the secret key
   // ------------------------------------------------
   const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

   // Check if the user is an admin based on the decoded token
   // ------------------------------------------------
   if (decodedToken.isAdmin) {
     // Allow the request to proceed if the user is an admin
     // ------------------------------------------------
     next();
   } else {
     // Deny access with a Forbidden error if the user is not an admin
     // ------------------------------------------------
     const err = new Error("You are not an admin"); // Error message
     err.statusCode = 403; // Forbidden status code
     throw err; // Throw the error for handling
   }
 } catch (err) {
   // Pass errors to error handling middleware
   // ------------------------------------------------
   next(err);
 }
};

// Export the isAdmin middleware
// ------------------------------------------------
module.exports = isAdmin;
