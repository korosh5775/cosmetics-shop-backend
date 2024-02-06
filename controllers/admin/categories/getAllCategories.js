// Import necessary modules
// ------------------------------------------------
const Category = require('../../../models/categorySchema');

// Define the getCategories function
// ------------------------------------------------
const getCategories = async (req, res) => {
  try {
    // Get all categories from the database
    // ------------------------------------------------
    const categories = await Category.find();

    // Checking if There are no categories to display
    // ------------------------------------------------
    if(!categories){
      const err = new Error("There are no categories to display");
      err.statusCode = 404; // Not found
      throw err;
    }

    // Send a response with the categories
    // ------------------------------------------------
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

// Export the getCategories function
// ------------------------------------------------
module.exports = getCategories;
