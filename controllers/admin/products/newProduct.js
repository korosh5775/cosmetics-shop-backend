// Import necessary modules
// ------------------------------------------------
const Products = require("../../../models/productsSchema");

// Define the newProduct function
// ------------------------------------------------
const newProduct = async (req, res, next) => {
 try {
   // Extract product details from request body
   // ------------------------------------------------
   const { name, price, description, quantity, category } = req.body;

   // Construct image file path
   // ------------------------------------------------
   const image = `${req.file.filename}`;

   // Create a new product object
   // ------------------------------------------------
   const newProduct = new Products({
     name,
     price,
     description,
     quantity,
     image,
     category,
   });

   // Save the product to the database
   // ------------------------------------------------
   const savedProduct = await newProduct.save();

   // Send a success response with the saved product
   // ------------------------------------------------
   res.status(201).json(savedProduct);
 } catch (error) {
   // Handle errors by passing them to the next middleware
   // ------------------------------------------------
   next(error);
 }
};

// Export the newProduct function
// ------------------------------------------------
module.exports = newProduct;
