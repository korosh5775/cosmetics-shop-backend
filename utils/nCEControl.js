// This function will controll inputed values
const Order = require("../models/orderSchema");
const Product = require("../models/productsSchema");
const User = require('../models/usersSchema');
exports.nCEControl = async(userId, productId, rate)=>{

const userExists = await User.findById(userId);
    if(!userExists){
      const err = new Error("please login first");
      err.statusCode = 401; // Unauthorized
      throw err;
    }

    // Check if the product exists
    // ------------------------------------------------
    const productExists = await Product.findById(productId);
    if (!productExists) {
      const err = new Error("The product does not exist");
      err.statusCode = 404; // Not found
      throw err;
    }

    // Validate the rate value
    // ------------------------------------------------
    if (rate < 1 || rate > 5) {
      const err = new Error("Rate number must be between 1 and 5");
      err.statusCode = 400; // Bad request
      throw err;
    }

    // Check if the user has purchased the product
    // ------------------------------------------------
    const userHasPurchased = await Order.findOne({
      user: userId,
      "items.productName": productExists.name,
    });

    if (!userHasPurchased) {
      const err = new Error("Please purchase the product first.");
      err.statusCode = 403; // Forbidden
      throw err;
    }

}

