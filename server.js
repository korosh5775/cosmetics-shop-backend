// Import necessary modules
// ------------------------------------------------
const express = require("express"); // Import the Express framework
const indexRoutes = require("./routes/index"); // Import the main application routes
const bodyParser = require("body-parser"); // Import body-parser middleware for parsing request bodies
const deleteExpiredOffCodes = require('./utils/cronjobs'); // Import the function for deleting expired off codes
require("dotenv").config(); // Load environment variables from .env file
require("./utils/connection"); // Establish database connection

// Create an Express application instance
// ------------------------------------------------
const app = express();

// Use body-parser middleware
// ------------------------------------------------
app.use(bodyParser.json()); // Parse JSON request bodies

// Set up root route
// ------------------------------------------------
app.use("/", indexRoutes); // Map the root route to the index routes

// Run the job to delete expired off codes
// ------------------------------------------------
deleteExpiredOffCodes; // This will remove expired off codes daily

// Configure server port
// ------------------------------------------------
const port = process.env.PORT || 3000; // Use port from environment variable or default to 3000

// Start the server
// ------------------------------------------------
app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
