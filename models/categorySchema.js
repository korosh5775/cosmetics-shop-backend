// Import the Mongoose library
// ------------------------------------------------
const mongoose = require("mongoose");

//create Schema
const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

// Export the Category model
// ------------------------------------------------
module.exports = mongoose.model("Category", CategorySchema);
