// Import Modules
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");


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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductsCategory",
  },
});
productSchema.plugin(mongoosePaginate);

//export schema
module.exports = mongoose.model("Product", productSchema);
