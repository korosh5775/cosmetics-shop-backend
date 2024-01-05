// Import necessary modules
// ------------------------------------------------
const Cart = require("../../../models/cartSchema");
const Product = require("../../../models/productsSchema");

// Define the newCart function
// ------------------------------------------------
const newCart = async (req, res, next) => {
 try {
   // Extract items and user ID from request
   // ------------------------------------------------
   const { items } = req.body;
   const userId = req.userId; // Obtained from authorization

   // Validate user authentication
   // ------------------------------------------------
   if (!userId) {
     const err = new Error("Please login first");
     err.statusCode = 401; // Unauthorized
     throw err;
   }

   // Find or create a cart for the user
   // ------------------------------------------------
   let cart = await Cart.findOne({ user: userId });

   // Validate product availability and stock
   // ------------------------------------------------
   for (const item of items) {
     const product = await Product.findById(item.product);

     if (!product) {
       const err = new Error(`Product with ID ${item.product} not found`);
       err.statusCode = 404; // Not found
       throw err;
     }

     if (item.quantity > product.quantity) {
       const err = new Error(`Not enough stock for ${product.name}`);
       err.statusCode = 400; // Bad request
       throw err;
     }
   }

   // Add or update items in the cart
   // ------------------------------------------------
   if (cart) {
     // Update existing items or add new items
     items.forEach((newItem) => {
       const existingItem = cart.items.find((cartItem) =>
         cartItem.product.toString() === newItem.product.toString()
       );

       if (existingItem) {
         existingItem.quantity += newItem.quantity;
       } else {
         cart.items.push(newItem);
       }
     });
   } else {
     // Create a new cart for the user
     cart = new Cart({
       user: userId,
       items,
     });
   }

   // Save the cart to the database
   // ------------------------------------------------
   const savedCart = await cart.save();

   // Send a success response with the saved cart
   // ------------------------------------------------
   res.status(201).json(savedCart);
 } catch (error) {
   // Pass errors to error handling middleware
   // ------------------------------------------------
   next(error);
 }
};

// Export the newCart function
// ------------------------------------------------
module.exports = newCart;
