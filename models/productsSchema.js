// Import the Mongoose library
// ------------------------------------------------
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");


//create Schema
const ProductSchema = mongoose.Schema({
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
  quantity:{
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});
ProductSchema.plugin(mongoosePaginate);

// Export the Product model
// ------------------------------------------------
module.exports = mongoose.model("Product", ProductSchema);
