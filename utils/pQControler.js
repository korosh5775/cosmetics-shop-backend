// This function reduces the number of each product after each order.

// Import the Product model
// ------------------------------------------------
const Product = require('../models/productsSchema');

// Export the pqcontrol function for managing product quantities
// ------------------------------------------------
exports.pqcontrol = async (cart) => {
  // Iterate through each item in the cart
  // ------------------------------------------------
  for (let item of cart.items) {
    // Fetch the product details from the database
    // ------------------------------------------------
    const product = await Product.findById(item.product._id);

    // Handle product not found error
    // ------------------------------------------------
    if (!product) {
      const err = new Error(`${item.product.name} not found`);
      err.statusCode = 404; // Not found
      throw err;
    }

    // Update product quantity
    // ------------------------------------------------
    product.quantity -= item.quantity;

    // Check for insufficient stock
    // ------------------------------------------------
    if (product.quantity < 0) {
      const err = new Error(`Not enough stock for ${item.product.name}`);
      err.statusCode = 400; // Bad request
      throw err;
    }

    // Save updated product quantity to the database
    // ------------------------------------------------
    await product.save();
  }
};
