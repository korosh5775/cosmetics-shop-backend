// Import necessary module
// ------------------------------------------------
const Product = require("../../../models/productsSchema");
const Comments = require("../../../models/commentsSchema");

// Define the getProduct function
// ------------------------------------------------
const getProduct = async (req, res, next) => {
 try {
   // Extract product ID from request parameters
   // ------------------------------------------------
   const { productId } = req.params;

   // Find the product in the database
   // ------------------------------------------------
   const product = await Product.findById(productId);

   // Check if the product exists
   // ------------------------------------------------
   if (!product) {
     const err = new Error("Product not found"); // Error message for clarity
     err.statusCode = 404; // Not Found status code
     throw err; // Throw the error for error handling
   }

 /*   //?................................................
   const comments = await Comments.find({product: productId});

   if (comments) {
    await Product.updateOne(
    { _id: productId },
    {
      $set: { // Use $set operator to update specific fields
       comments
      },
    }
  );
  }
  const productWithComments = await Product.findById(productId); */
   
// Send the product details as a JSON response
   // ------------------------------------------------
   res.status(200).json(product);

  //?..................................................

  
   
 } catch (error) {
   // Pass errors to error handling middleware
   // ------------------------------------------------
   next(error);
 }
};

// Export the getProduct function
// ------------------------------------------------
module.exports = getProduct;
