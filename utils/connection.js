// Import the Mongoose library
// ------------------------------------------------
const mongoose = require("mongoose");

// Connect to the MongoDB database
// ------------------------------------------------
mongoose
  .connect("mongodb://localhost/cosmeticsShop")
  .then(() => {
    // Log a message to the console to indicate that the connection was successful
    console.log("connected to db");
  });
