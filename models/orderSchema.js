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
  fullName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  plaque:{
    type:Number,
    required: true
  },
  postalCode:{
    type: Number,
    minlength: 10,
    maxlength:10
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