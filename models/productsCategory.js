// Import Models
const mongoose = require("mongoose");

//create Schema
const productsCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

//export schema
module.exports = mongoose.model("ProductsCategory", productsCategorySchema);
