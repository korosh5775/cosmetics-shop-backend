// Import necessary modules
// ------------------------------------------------
const Order = require("../../../models/orderSchema");
const Cart = require("../../../models/cartSchema");
const OffCode = require("../../../models/offCodeSchema");
const { pqcontrol } = require("../../../utils/pQControler");

// Define the newOrder function
// ------------------------------------------------
const newOrder = async (req, res, next) => {
 try {
   // Extract user information and offCode from request
   // ------------------------------------------------
   const { userName, location, phone, offCode } = req.body;
   const userId = req.userId; // Obtained from authorization

   // Validate user authentication
   // ------------------------------------------------
   if (!userId) {
     const err = new Error("Please login first");
     err.statusCode = 401; // Unauthorized
     throw err;
   }

   // Find the user's cart and populate product details
   // ------------------------------------------------
   const cart = await Cart.findOne({ user: userId })
     .populate("items.product")
     .lean();

   // Check if the cart exists
   // ------------------------------------------------
   if (!cart) {
     const err = new Error("Your cart is empty.");
     err.statusCode = 404; // Not Found
     throw err;
   }

   // Validate and fetch the offCode (if provided)
   // ------------------------------------------------
   let existCode;
   if (offCode) {
     existCode = await OffCode.findOne({
       code: offCode,
       startDate: { $lte: new Date() }, // Start date should be before or equal to current date
       expireDate: { $gte: new Date() }, // Expire date should be after or equal to current date
     }).lean();

     if (!existCode) {
       const err = new Error("Invalid discount code.");
       err.statusCode = 404; // Not Found
       throw err;
     }
   }

   // Prepare order items and apply discount if applicable
   // ------------------------------------------------
   let totalPrice = 0;
   const orderItems = cart.items.map((item) => {
     const product = item.product; // Access product information due to '.populate'
     let itemTotalPrice = product.price * item.quantity;

     if (existCode && validProducts.includes(product._id.toString())) {
       const discount = (existCode.percent / 100) * product.price;
       itemTotalPrice -= discount * item.quantity; // Apply discount
     }

     totalPrice += itemTotalPrice;

     return { productName: product.name, quantity: item.quantity, price: itemTotalPrice };
   });

   // Create the new order
   // ------------------------------------------------
   const order = new Order({
     user: userId,
     userName,
     location,
     phone,
     items: orderItems,
     totalPrice,
     offCode,
   });

   // Update product quantities based on the order
   // ------------------------------------------------
   await pqcontrol(cart);

   // Save the order and remove the cart
   // ------------------------------------------------
   const savedOrder = await order.save();
   await Cart.deleteOne({ _id: cart._id });

   // Send a success response with the saved order
   // ------------------------------------------------
   res.status(200).json(savedOrder);
 } catch (error) {
   // Handle errors and pass them to error handling middleware
   // ------------------------------------------------
   next(error);
 }
};

// Export the newOrder function
// ------------------------------------------------
module.exports = newOrder;
