// Import the Mongoose library
// ------------------------------------------------
const mongoose = require("mongoose");

const OrderItemSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const OrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },

  items: [OrderItemSchema], 
  totalPrice: Number,
  offCode: String,
  adminNote:{
    type: String,
    maxlength: 254
  },
  userNote:{
    type: String,
    maxlength: 254
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

// Export the Order model
// ------------------------------------------------
module.exports = mongoose.model("Order", OrderSchema);