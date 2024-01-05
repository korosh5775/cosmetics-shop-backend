// Import the Mongoose library
// ------------------------------------------------
const mongoose = require("mongoose");

const OffCodeSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  percent: {
    type: Number,
    required: true,
    min:0,
    max:100
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expireDate: {
    type: Date,
    required: true,
  },
});

// Export the OffCode model
// ------------------------------------------------
module.exports = mongoose.model("OffCode", OffCodeSchema);

