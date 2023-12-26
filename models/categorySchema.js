// Import Modules
const mongoose = require("mongoose");

//create Schema
const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

//export schema
module.exports = mongoose.model("Category", CategorySchema);
