//import modules
const mongoose = require("mongoose");

//create Schema
const productSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  description: {
    type: String,
    maxlength: 200,
    required: true,
  },
});

//export schema
module.exports = mongoose.model("Product", productSchema);
