// Import Modules
const mongoose = require("mongoose");

//create schema
const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
      },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    maxlength: 30,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 255,
    required: true,
  },
  isAdmin:{
    type: Boolean,
    default: false//* we can change it to true from database
  }
});

//export Schema
module.exports = mongoose.model("User", userSchema);
