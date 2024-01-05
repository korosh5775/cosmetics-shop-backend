// Import modules
// ------------------------------------------------
const Comments = require("../../../models/commentsSchema");
const Order = require('../../../models/orderSchema');  

// Define the newComment function
// ------------------------------------------------
const newComment = async (req, res, next) => {
 try {
   // Extract data from request
   // ------------------------------------------------
   const { comment, rate } = req.body;
   const { productId } = req.params;
   const user = req.userId;

   // Check if the product exists
   // ------------------------------------------------
   const productExists = await Product.findById(productId);
   if (!productExists) {
     const err = new Error("The product dos not fount"); 
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
     'items.product': productId
   });

   if (!userHasPurchased) {
     const err = new Error("Please purchase the product first.");
     err.statusCode = 403; // Forbidden
     throw err;
   }

   // Create a new comment
   // ------------------------------------------------
   const newComment = new Comments({
     user,
     product: productId,
     comment,
     rate,
   });

   // Save the comment to the database
   // ------------------------------------------------
   const savedComment = await newComment.save();

   // Send a success response with the saved comment
   // ------------------------------------------------
   res.status(201).json(savedComment);
 } catch (error) {
   next(error);
 }
};

// Export the newComment function
// ------------------------------------------------
module.exports = newComment;
