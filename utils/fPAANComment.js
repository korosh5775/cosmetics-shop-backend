// This function finds the product and adds the new comment to it
//..................................................................................................................


// Import required modules
// ------------------------------------------------
const Comments = require("../models/commentsSchema");
const Product = require("../models/productsSchema");

// Function to add new comments to a product and update the product with the new comment
// -----------------------------------------------------------------------------------------
exports.findProductAndAddNewComment = async (productId) => {
  // Find all comments for the given product
  // ------------------------------------------------
  const comments = await Comments.find({ product: productId });

  // Update the product with the new comments using $set operator
  // ------------------------------------------------
  await Product.updateOne(
    { _id: productId },
    {
      $set: {
        // Use $set operator to update specific fields
        comments,
      },
    }
  );
};
