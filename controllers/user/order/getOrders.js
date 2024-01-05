// Import necessary module
// ------------------------------------------------
const Orders = require('../../../models/orderSchema');

// Define the getOrders function
// ------------------------------------------------
const getOrders = async (req, res, next) => {
  try {
    // Extract user ID from request
    // ------------------------------------------------
    const userId = req.userId;

    // Validate user authentication
    // ------------------------------------------------
    if (!userId) {
      const err = new Error("Please login first");
      err.statusCode = 401; // Unauthorized
      throw err; // Throw error for handling
    }

    // Find orders for the user
    // ------------------------------------------------
    const orders = await Orders.find({ user: userId });

    // Check if any orders exist
    // ------------------------------------------------
    if (!orders) {
      const err = new Error("There are no orders to show");
      err.statusCode = 404; // Not found
      throw err; // Throw error for handling
    }

    // Send a success response with the orders
    // ------------------------------------------------
    res.status(200).json(orders);
  } catch (error) {
    // Pass errors to error handling middleware
    // ------------------------------------------------
    next(error);
  }
};

// Export the getOrders function
// ------------------------------------------------
module.exports = getOrders;
