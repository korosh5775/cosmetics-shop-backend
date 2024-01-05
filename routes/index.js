// Import necessary modules
// ------------------------------------------------
const express = require("express"); // Express framework

// Create an Express router
// ------------------------------------------------
const router = express.Router();

// Define routes for users v1.1
// ------------------------------------------------
const usersV_1_1 = require("./api/v1.1/users"); // Import the users v1.1 module
router.use("/v1.1/users", usersV_1_1); // Map the /v1.1/users route to the usersV_1_1 module

// Define routes for admin v1.1
// ------------------------------------------------
const adminV1_1 = require('./api/v1.1/admin'); // Import the admin v1.1 module
router.use("/v1.1/admin",adminV1_1); // Map the /v1.1/admin route to the adminV1_1 module

// Export the router
// ------------------------------------------------
module.exports = router;
