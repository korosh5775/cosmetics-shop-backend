// Import modules
// ------------------------------------------------
const Comments = require("../../../models/commentsSchema");
const Order = require("../../../models/orderSchema");
const Product = require("../../../models/productsSchema");
const User = require('../../../models/usersSchema');

// Define the newComment function
// ------------------------------------------------
const newComment = async (req, res, next) => {
  try {
    // Extract data from request
    // ------------------------------------------------
    const { comment, rate } = req.body;
    const { productId } = req.params;
    const userId = req.userId;

    const userExists = await User.findById(userId);
    if(!userExists){
      const err = new Error("please login first");
      err.statusCode = 401; // Unauthorized
      throw err;
    }

    // Check if the product exists
    // ------------------------------------------------
    const productExists = await Product.findById(productId);
    if (!productExists) {
      const err = new Error("The product does not exist");
      err.statusCode = 404; // Not found
      throw err;
    }

    // Validate the rate value
    // ------------------------------------------------
    if (rate < 1 || rate > 5) {
      const err = new Error("Rate number must be between 1 and 5");
      err.statusCode = 400; // Bad request
      throw err;
    }

    // Check if the user has purchased the product
    // ------------------------------------------------
    const userHasPurchased = await Order.findOne({
      user: userId,
      "items.productName": productExists.name,
    });

    if (!userHasPurchased) {
      const err = new Error("Please purchase the product first.");
      err.statusCode = 403; // Forbidden
      throw err;
    }

    // Check if the user already has a comment for the product
    // ------------------------------------------------
    const existingComment = await Comments.findOne({
      user: userId,
      product: productId,
    });

    // Add new comments to product
    //-------------------------------------------------
    const findPeoductAndAddNewComment = async()=>{
      const comments = await Comments.find({product: productId});
      await Product.updateOne(
        { _id: productId },
        {
          $set: { // Use $set operator to update specific fields
           comments
          },
        }
      );
    }

    // If the user already has a comment, update it
    // ------------------------------------------------
    if (existingComment) {
      await Comments.updateOne(
        { _id: existingComment._id },
        { $set: { comment, rate } }
      );

      // Add new comment to product
      // ------------------------------------------------
      findPeoductAndAddNewComment()

      // Send a success response with the successfully message
      // ------------------------------------------------
      res.status(200).json("Your comment has been updated");
    } else {
      // Create a new comment
      // ------------------------------------------------
      const newComment = new Comments({
        user: userId,
        product: productId,
        userName: userExists.userName,
        comment,
        rate,
      });

      // Save the comment to the database
      // ------------------------------------------------
      const savedComment = await newComment.save();

      // Add new comment to product
      // ------------------------------------------------
      findPeoductAndAddNewComment()
      //?......................................................2

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
