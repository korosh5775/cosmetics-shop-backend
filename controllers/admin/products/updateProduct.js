// Import modules
const Products = require("../../../models/productsSchema");
const fs = require("fs");
const path = require("path");

const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { name, price, description,quantity, category } = req.body;
    const image = `${req.file.filename}`;

    //*finding the product to check if it exists
    const product = await Products.findById(productId);

    //* checking if product exists
    if (!product) {
      const err = new Error("Product not found.");
      err.statusCode = 404; //* not found
      throw err;
    }

    //*finding current image path
    const currentImagePath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "images",
      product.image
    );

    /*if a requested file (req.file) exists,
     as well as the current image path (currentImagePath),
      and there exists a file at that path (fs.existsSync(currentImagePath))
      then remove that image*/
    if (req.file && currentImagePath && fs.existsSync(currentImagePath)) {
      fs.unlinkSync(currentImagePath);
    }

    //* updating product with new details
    await Products.updateOne(
      { _id: productId },
      {
        $set: { //* we using the $set operator to change old data with new data
          name,
          price,
          description,
          quantity,
          image,
          category,
        },
      }
    );

    res.status(200).json("prodact updated");
  } catch (err) {
    next(err);
  }
};

// Export updateProduct
module.exports = updateProduct;
