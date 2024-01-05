// Import necessary modules
// ------------------------------------------------
const Category = require("../../../models/categorySchema");

// Define the newCategory function
// ------------------------------------------------
const newCategory = async (req, res, next) => {
  try {
    // Create a new category object
    // ------------------------------------------------
    const createCategory = new Category({
      name: req.body.name,
    });

    // Save the category to the database
    // ------------------------------------------------
    const savedCategory = await createCategory.save();

    // Send a success response with the saved category
    // ------------------------------------------------
    res.status(201).json(savedCategory);
  } catch (error) {
    next(error);
  }
};

// Export the newCategory function
// ------------------------------------------------
module.exports = newCategory;
