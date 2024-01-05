// Import the necessary module
// ------------------------------------------------
const Products = require("../../../models/productsSchema");

// Define the getBatchOfProduct function
// ------------------------------------------------
const getBatchOfProduct = async (req, res, next) => {
  try {
    // Extract category ID, page, and limit from request
    // ------------------------------------------------
    const { categoryId } = req.params;
    const page = req.query.page ? parseInt(req.query.page) : 1; // Default to page 1 if not provided
    const limit = req.query.limit ? parseInt(req.query.limit) : 10; // Default to 10 products per page

    // Set up pagination options
    // ------------------------------------------------
    const options = {
      page,
      limit,
      sort: { _id: -1 }, // Sort products from newest to oldest
      lean: true, // Optimize query by converting MongoDB documents to plain JavaScript objects
    };

    // Find products for the specified category with pagination
    // ------------------------------------------------
    const allBatchedProducts = await Products.paginate({ category: categoryId }, options);

    // Send only the product data in the response
    // ------------------------------------------------
    res.json(allBatchedProducts.docs);
  } catch (err) {
    // Pass errors to error handling middleware
    // ------------------------------------------------
    next(err);
  }
};

// Export the getBatchOfProduct function
// ------------------------------------------------
module.exports = getBatchOfProduct;
