// Import Modules
const mongoose = require("mongoose");

//create Schema
const orderSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  items: [
    {
      cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
      },
    },
  ],
  totalPrice: Number,

  off: String,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

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
