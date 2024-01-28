// This function calculates the average score of each product
//..................................................................................................................


// Import necessary modules
// ------------------------------------------------
const Product = require('../models/productsSchema');

exports.averageRateCalculator = async (productId) => {
  // Get the product document with its comments
  // ------------------------------------------------
  const product = await Product.findById(productId).populate("comments");

  // Extract all the rates from the comments
  // ------------------------------------------------
  const rates = product.comments.map((comment) => comment.rate);

  // Initialize a variable to store the total rates
  // ------------------------------------------------
  let averageRates = 0;

  // Calculate the total rates by adding each rate
  // ------------------------------------------------
  for (let i = 0; i < rates.length; i++) {
    averageRates += rates[i];
  }

  // Calculate the average rate by dividing the total by the number of rates
  // ------------------------------------------------
  averageRates = averageRates / rates.length;

  // Log the average rate for debugging purposes
  // ------------------------------------------------
  console.log(averageRates);

  // Update the product document with the calculated average rate
  // ------------------------------------------------
  await Product.updateOne(
    { _id: productId },
    {
      $set: {
        // Use $set operator to update the averageRates field
        averageRates,
      },
    }
  );
};
