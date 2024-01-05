// Import necessary modules
// ------------------------------------------------
const Category = require("../../../models/categorySchema");

// Define the updateCategory function
// ------------------------------------------------
const updateCategory = async (req, res, next) => {
 try {
   // Extract data from request
   // ------------------------------------------------
   const { categoryId } = req.params;
   const { name } = req.body;

   // Find the category to update
   // ------------------------------------------------
   const category = await Category.findById(categoryId);

   // Check if the category exists
   // ------------------------------------------------
   if (!category) {
     const err = new Error("There is no category to edit");
     err.statusCode = 404; // Not found
     throw err;
   }

   // Update the category
   // ------------------------------------------------
   await Category.updateOne({ _id: categoryId }, { $set: { name } });

   // Send a success response
   // ------------------------------------------------
   res.status(200).json("Category has been updated");
 } catch (error) {
   next(error);
 }
};

// Export the updateCategory function
// ------------------------------------------------
module.exports = updateCategory;
