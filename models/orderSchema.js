// Import Modules
const mongoose = require("mongoose");

//create Schema
const orderSchema = mongoose.Schema({
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },

      quantity: Number,

      price: Number,
    },
  ],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  total: Number,

  status: {
    type: String,
    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//export schema
module.exports = mongoose.model("Order", orderSchema);
