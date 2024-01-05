// Import necessary modules
// ------------------------------------------------
const Products = require("../../../models/productsSchema");
const fs = require("fs");
const path = require("path");

// Define the updateProduct function
// ------------------------------------------------
const updateProduct = async (req, res, next) => {
 try {
   // Extract product ID and updated details from request
   // ------------------------------------------------
   const { productId } = req.params;
   const { name, price, description, quantity, category } = req.body;
   const image = `${req.file.filename}`;

   // Find the product to update
   // ------------------------------------------------
   const product = await Products.findById(productId);

   // Check if the product exists
   // ------------------------------------------------
   if (!product) {
     const err = new Error("Product not found.");
     err.statusCode = 404; // Not found
     throw err;
   }

   // Handle image deletion if a new image is uploaded
   // ------------------------------------------------
   const currentImagePath = path.join(
     __dirname,
     "..",
     "..",
     "public",
     "images",
     product.image
   );

   if (req.file && currentImagePath && fs.existsSync(currentImagePath)) {
     fs.unlinkSync(currentImagePath); // Delete the old image
   }

   // Update the product in the database
   // ------------------------------------------------
   await Products.updateOne(
     { _id: productId },
     {
       $set: { // Use $set operator to update specific fields
         name,
         price,
         description,
         quantity,
         image,
         category,
       },
     }
   );

   // Send a success response
   // ------------------------------------------------
   res.status(200).json("Product updated");
 } catch (err) {
   // Handle errors
   // ------------------------------------------------
   next(err);
 }
};

// Export the updateProduct function
// ------------------------------------------------
module.exports = updateProduct;
