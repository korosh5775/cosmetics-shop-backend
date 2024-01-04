// Import modules
const Order = require("../../../models/orderSchema");
const Cart = require("../../../models/cartSchema");
const OffCode = require("../../../models/offCodeSchema");
const { pqcontrol } = require("../../../utils/pQControler");

const newOrder = async (req, res, next) => {
  try {
    // Extract user's info from the request body
    const { userName, location, phone, offCode } = req.body;

    // Assume userId is set from an authorization middleware
    const userId = req.userId;

    // Throw an error if no userId is found, indicating the user is not logged in
    if (!userId) {
      const err = new Error("Please login first");
      err.statusCode = 401; // Status code for Unauthorized
      throw err;
    }

    // Find the user's cart by userId and populate product details within items
    const cart = await Cart.findOne({ user: userId })
      .populate("items.product")
      .lean();

    // If the cart doesn't exist, throw an error
    if (!cart) {
      const err = new Error("Your cart is empty.");
      err.statusCode = 404; // Status code for Not Found
      throw err;
    }


    // Check if provided offCode exists and is active
    const existCode = await OffCode.findOne({
      code: offCode,
      startDate: { $lte: new Date() }, // startDate should be less than or equal to the current date
      expireDate: { $gte: new Date() }, // expireDate should be greater than or equal to the current date
    }).lean();

    if (!existCode) {
      const err = new Error("Invalid discount code.");
      err.statusCode = 404; // Status code for Not Found
      throw err;
    }

    // Create a list of valid products from the offCode
    const validProducts = existCode.items.map((item) =>
      item.product.toString()
    );

    // Initialize total price of the order
    let totalPrice = 0;

    // Prepare the array of order items
    const orderItems = cart.items.map((item) => {
      const product = item.product; // We have the product info because of '.populate'

      // Calculate item total price
      let itemTotalPrice = product.price * item.quantity;

      // Check if the current product is eligible for the offCode discount
      if (validProducts.includes(product._id.toString())) {
        const discount = (existCode.percent / 100) * product.price;
        itemTotalPrice -= discount * item.quantity; // Apply discount
      }

      totalPrice += itemTotalPrice; // Add to order's total price

      return {
        productName: product.name, // Store product name
        quantity: item.quantity, // Store quantity
        price: itemTotalPrice, // Store total price for item
      };
    });

    // Create new order with user details, order items, and total price
    const order = new Order({
      user: userId,
      userName,
      location,
      phone,
      items: orderItems, // Include detailed items list
      totalPrice,
      offCode,
    });

    // Call function to decrease product quantities based on the order
    await pqcontrol(cart);

    // Save the new order in the database
    const savedOreder = await order.save();

    // Remove the user's cart since the order has been placed
    await Cart.deleteOne({ _id: cart._id });

    // Respond with a successful message and include the saved order
    res
      .status(200)
      .json(savedOreder);
  } catch (error) {
    // If there's any error, pass it to the error handling middleware
    next(error);
  }
};

// Export the newOrder function so it can be used in other parts of the application
module.exports = newOrder;
