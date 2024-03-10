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
   const {fullName, address, plaque,postalCode, phone, userNote, offCode } = req.body;
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
   let validProducts;
   if (offCode) {
     existCode = await OffCode.findOne({
       code: offCode,
       startDate: { $lte: new Date() },
       expireDate: { $gte: new Date() },
     }).lean();

     if (!existCode) {
       const err = new Error("Invalid discount code.");
       err.statusCode = 404; // Not Found
       throw err;
     }
    // Create a list of valid products from the offCode
   // ------------------------------------------------
   validProducts = existCode.items.map(item => item.product.toString());
    }

   console.log(existCode)

  

   // Prepare order items and apply discount if applicable
   // ------------------------------------------------
   let totalPrice = 0;
   const orderItems = cart.items.map((item) => {
     const product = item.product; // Access product information due to '.populate'
     let itemTotalPrice = product.price * item.quantity;

     // Apply discount if the product is eligible
   // ------------------------------------------------
     if (existCode && validProducts.includes(product._id.toString())) {
       const discount = (existCode.percent / 100) * product.price;
       itemTotalPrice -= discount * item.quantity;
     }

     totalPrice += itemTotalPrice;

     // Return product information with updated price
   // ------------------------------------------------
     return { productName: product.name, quantity: item.quantity, price: itemTotalPrice };
   });

   // Check if a pending order already exists for the user
   // ------------------------------------------------
   const existOrder = await Order.findOne({ user: userId,address: address, status: "Pending" });

   if (existOrder) {
     // Update existing order with new items
   // ------------------------------------------------
     for (const item of orderItems) {
       const existingItemIndex = existOrder.items.findIndex(orderItem => orderItem.productName === item.productName);

       if (existingItemIndex > -1) {
         // Update quantity and price if item exists
   // ------------------------------------------------
         existOrder.items[existingItemIndex].quantity += item.quantity;
         existOrder.items[existingItemIndex].price += item.price;
       } else {
         // Add new item if it doesn't exist
   // ------------------------------------------------
         existOrder.items.push(item);
       }
     }

     // Update total price of order
   // ------------------------------------------------
     existOrder.totalPrice += totalPrice;


     
    await Order.updateOne(
      { _id: existOrder._id },
      {
        $set: {
          fullName,
          address,
          plaque,
          postalCode,
          phone,
          userNote,
          offCode,
        },
      }
    );
// Save updated order to database
    // ------------------------------------------------
    await existOrder.save();
     // Respond with updated order
   // ------------------------------------------------
     res.status(200).json("your order has been updated");
   } else {
     // If no pending order exists, create a new one
   // ------------------------------------------------
     const order = new Order({
       user: userId,
       fullName,
       address,
       plaque,
       postalCode,
       phone,
       userNote,
       items: orderItems,
       totalPrice,
       offCode,
     });

     // Save new order to database
   // ------------------------------------------------
     const savedOrder = await order.save();

     // Respond with new saved order
   // ------------------------------------------------
     res.status(200).json(savedOrder);
   }

   // Update product quantities in inventory based on the order
   // ------------------------------------------------
   await pqcontrol(cart);

   // Remove the cart after order submission
   // ------------------------------------------------
   await Cart.deleteOne({ _id: cart._id });

   // Finished processing the order
   // ------------------------------------------------
 } catch (error) {
   // Handle any errors that occur during order processing
   // ------------------------------------------------
   next(error);
 }
};

// Export the newOrder function for use in other modules
   // ------------------------------------------------
module.exports = newOrder;