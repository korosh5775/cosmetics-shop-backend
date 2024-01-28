// Import necessary modules
// ------------------------------------------------
const Comments = require("../../../models/commentsSchema");
const { nCEControl } = require("../../../utils/nCEControl");
const { findProductAndAddNewComment } = require("../../../utils/fPAANComment");
const { averageRateCalculator } = require("../../../utils/aRCalculator");

// Define the newComment function
// ------------------------------------------------
const newComment = async (req, res, next) => {
  try {
    // Extract data from the request body and params
    // ------------------------------------------------
    const { comment, rate } = req.body;
    const { productId } = req.params;
    const userId = req.userId;

    // Validate input values
    // ------------------------------------------------
    nCEControl(userId, productId, rate);

    // Check if the user already has a comment for the product
    // ------------------------------------------------
    const existingComment = await Comments.findOne({
      user: userId,
      product: productId,
    });

    // If the user already has a comment, update it
    // ------------------------------------------------
    if (existingComment) {
      await Comments.updateOne(
        { _id: existingComment._id },
        { $set: { comment, rate } }
      );

      // Send a success response indicating comment update
      // ------------------------------------------------
      res.status(200).json("Your comment has been updated");

      // Update product with new comment and recalculate average rating
      // ------------------------------------------------
      await findProductAndAddNewComment(productId);
      await averageRateCalculator(productId);
    } else {
      // Create a new comment
      // ------------------------------------------------
      const newComment = new Comments({
        user: userId,
        product: productId,
        userName: userExists.userName, // Assuming userExists is defined elsewhere
        comment,
        rate,
      });

      // Save the comment to the database
      // ------------------------------------------------
      const savedComment = await newComment.save();

      // Update product with new comment and recalculate average rating
      // ------------------------------------------------
      await findProductAndAddNewComment(productId);
      await averageRateCalculator(productId);

      // Send a success response with the saved comment
      // ------------------------------------------------
      res.status(201).json(savedComment);
    }
  } catch (error) {
    // Pass errors to error handling middleware
    // ------------------------------------------------
    next(error);
  }
};

// Export the newComment function
// ------------------------------------------------
module.exports = newComment;
