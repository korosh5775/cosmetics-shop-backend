// Import Modules
const mongoose = require("mongoose");

//create Schema
const ProductsCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

//export schema
module.exports = mongoose.model("ProductsCategory", ProductsCategorySchema);
