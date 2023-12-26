// Import modules
const Products = require("../../../models/productsSchema");
const fs = require("fs");
const path = require("path");

const removeProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Products.findById(productId);

    //* check if product doesn't exists
    if (!product) {
      const err = new Error("There is no product to remove.");
      err.statusCode = 404; //* not found
      throw err;
    }

    //* find image from public folder
    const imagePath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "images",
      product.image
    );
    fs.unlink(imagePath, async (err) => {
      if (err) {
        next(err); //* forward the error if unable to delete the image
      } else {
        //* if the product image is successfully deleted, the product will be deleted
        await Products.findByIdAndDelete(productId);
        res.status(200).json("Product and image removed.");
      }
    });
  } catch (err) {
    next(err);
  }
};

// Export removeProduct
module.exports = removeProduct;
