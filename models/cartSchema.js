// Import the Mongoose library
// ------------------------------------------------
const mongoose = require("mongoose");

// Define the schema for a cart item
// ------------------------------------------------
const CartItemSchema = mongoose.Schema({

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  quantity: {
    type: Number,
    min: 1,
    default: 1,
    required: true,
  },
});

// Define the schema for a cart
// ------------------------------------------------
const CartSchema = mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [CartItemSchema],

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the Cart model
// ------------------------------------------------
module.exports = mongoose.model("Cart", CartSchema);
