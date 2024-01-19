// Import the Mongoose library
// ------------------------------------------------
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productsCommentsSchema = mongoose.Schema({
  userName:{
    type:String,
    required: true
  },
  comment:{
    type: String,
    required: true
  },
  rate:{
    type: Number,
    required: true
  },
  createdAt:{
    type:Date,
    required: true
  }
})
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
  averageRates:{
    type: Number,
    required: true,
    default: 0
  }
  ,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  comments:[productsCommentsSchema]
});
ProductSchema.plugin(mongoosePaginate);

// Export the Product model
// ------------------------------------------------
module.exports = mongoose.model("Product", ProductSchema);
