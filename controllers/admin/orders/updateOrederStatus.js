// Import necessary modules
// -------------------------------------------
const Order = require("../../../models/orderSchema");

// Define the updateOrderStatus function
// -------------------------------------------
const updateOrderStatus = async (req, res, next) => {
  try {
    // Extract order ID, new status, and user note from request body
    const { status, adminNote } = req.body;
    const { orderId} = req.params;

    // Validate user input
    // -------------------------------------------
    if (!orderId && !status) {
      const err = new Error("Order ID and new status are required.");
      err.status = 400; // Bad Request
      throw err;
    }

    // Find the order by ID
    // -------------------------------------------
    const order = await Order.findById(orderId);

    // Check if the order exists
    // -------------------------------------------
    if (!order) {
      const err = new Error("Order not found.");
      err.status = 404; // Not Found
      throw err;
    }

    // Update the order's status and add a note for the user
    // -------------------------------------------
    await Order.updateOne(
      {_id: orderId},{
      $set:{
        status,
        adminNote
      }}
    )

    

    // Send a success response with the updated order
    // -------------------------------------------
    res.status(200).json("status has been changed");
  } catch (error) {
    // Handle errors and pass them to error handling middleware
    next(error);
  }
};

// Export the updateOrderStatus function
// -------------------------------------------
module.exports = updateOrderStatus;