// Import necessary modules
// ------------------------------------------------
const Products = require("../../../models/productsSchema");
const fs = require("fs");
const path = require("path");

// Define the removeProduct function
// ------------------------------------------------
const removeProduct = async (req, res, next) => {
 try {
   // Extract product ID from request params
   // ------------------------------------------------
   const { productId } = req.params;

   // Find the product to be removed
   // ------------------------------------------------
   const product = await Products.findById(productId);

   // Check if the product exists
   // ------------------------------------------------
   if (!product) {
     const err = new Error("There is no product to remove.");
     err.statusCode = 404; // Not found
     throw err;
   }

   // Construct the image path
   // ------------------------------------------------
   const imagePath = path.join(
     __dirname,
     "..",
     "..",
     "..",
     "public",
     "images",
     product.image
   );

   // Delete the product image
   // ------------------------------------------------
   fs.unlink(imagePath, async (err) => {
     if (err) {
       // Handle errors during image deletion
       // ------------------------------------------------
       next(err);
     } else {
       // Delete the product record from the database
       // ------------------------------------------------
       await Products.findByIdAndDelete(productId);
       res.status(200).json("Product and image removed.");
     }
   });
 } catch (err) {
   // Handle general errors
   // ------------------------------------------------
   next(err);
 }
};

// Export the removeProduct function
// ------------------------------------------------
module.exports = removeProduct;
