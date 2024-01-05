// Import necessary modules
// ------------------------------------------------
const Category = require("../../../models/categorySchema");
const Products = require('../../../models/productsSchema');
const fs = require("fs");
const path = require("path");

// Define the removeCategory function
// ------------------------------------------------
const removeCategory = async (req, res, next) => {
 try {
   // Extract data from request
   // ------------------------------------------------
   const { categoryId } = req.params;

   // Find the category and associated products
   // ------------------------------------------------
   const category = await Category.findById(categoryId);
   const products = await Products.find({ category: categoryId });

   // Check if the category exists
   // ------------------------------------------------
   if (!category) {
     const err = new Error("There is no category to remove.");
     err.statusCode = 404; // Not found
     throw err;
   }

   // Prepare to delete product images
   // ------------------------------------------------
   const deleteProductImages = products.map(product => {
     return new Promise((resolve, reject) => {
       const imagePath = path.join(
         __dirname,
         "..",
         "..",
         "..",
         "..",
         "public",
         "images",
         product.image
       );

       fs.unlink(imagePath, err => {
         if (err) {
           reject(err); // Reject the promise if unable to delete the image
         } else {
           resolve(); // Resolve the promise if the image is deleted
         }
       });
     });
   });

   // Wait for all product images to be deleted
   // ------------------------------------------------
   await Promise.all(deleteProductImages);

   // Delete all products in the category
   // ------------------------------------------------
   await Products.deleteMany({ category: categoryId });

   // Delete the category itself
   // ------------------------------------------------
   await Category.findByIdAndDelete(categoryId);

   // Send a success response
   // ------------------------------------------------
   res.status(200).json("Category and products have been removed.");
 } catch (err) {
   next(err);
 }
};

// Export the removeCategory function
// ------------------------------------------------
module.exports = removeCategory;
